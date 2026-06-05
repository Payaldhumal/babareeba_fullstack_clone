require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const crypto = require('crypto')
const app = express();
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASS || 'secret'
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'


// Security headers
app.use(helmet())

// CORS (consider restricting origin in production)
app.use(cors());

// Request ID for tracing
app.use((req, res, next)=>{
	try{ req.id = crypto.randomUUID() }catch(e){ req.id = Date.now().toString() }
	res.setHeader('X-Request-Id', req.id)
	next()
})

// Logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req[header]'))

// Body parser
app.use(express.json());

// Basic rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false, message: { status: 'rate_limited' } })
app.use(limiter)

app.get('/', (req,res)=>res.json({message:'API Running'}));

app.post('/contact', (req,res)=>{
	const { name, email, message } = req.body || {};
	console.log('Contact received:', {name,email});
	const outDir = path.resolve(__dirname)
	const file = path.join(outDir,'contacts.json')
	const entry = { id: Date.now(), name, email, message, receivedAt: new Date().toISOString() }
	let all = []
	try{ if(fs.existsSync(file)){ all = JSON.parse(fs.readFileSync(file,'utf8')||'[]') } }catch(e){ all = [] }
	all.push(entry)
	try{ fs.writeFileSync(file, JSON.stringify(all,null,2)) }catch(e){ console.error('Failed to write contacts', e) }
	res.json({status:'ok', id: entry.id});
});

function authenticateToken(req, res, next){
	const auth = req.headers.authorization || ''
	const parts = auth.split(' ')
	if(parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({status:'unauthorized'})
	const token = parts[1]
	jwt.verify(token, JWT_SECRET, (err, payload)=>{
		if(err) return res.status(403).json({status:'forbidden'})
		req.user = payload
		next()
	})
}

app.get('/contacts', authenticateToken, (req, res) => {
	const outDir = path.resolve(__dirname)
	const file = path.join(outDir,'contacts.json')
	try{
		if(fs.existsSync(file)){
			const data = JSON.parse(fs.readFileSync(file,'utf8')||'[]')
			return res.json({status:'ok', contacts: data})
		}
		return res.json({status:'ok', contacts: []})
	}catch(e){
		console.error('Failed to read contacts', e)
		return res.status(500).json({status:'error'})
	}
})

app.post('/auth/login', (req, res) => {
	const { username, password } = req.body || {}
	if(!username || !password) return res.status(400).json({status:'missing_credentials'})
	if(username === ADMIN_USER && password === ADMIN_PASS){
		const token = jwt.sign({username}, JWT_SECRET, { expiresIn: '2h' })
		return res.json({status:'ok', token})
	}
	return res.status(401).json({status:'invalid_credentials'})
})

app.get('/auth/verify', authenticateToken, (req,res)=>{
	res.json({status:'ok', user: req.user})
})



const port = process.env.PORT || 5000;
// Serve client in production if built
const clientDist = path.join(__dirname, '..', 'client', 'dist')
if(fs.existsSync(clientDist)){
	app.use(express.static(clientDist))
	app.get('*', (req,res)=>{
		res.sendFile(path.join(clientDist,'index.html'))
	})
}

// Uploads
const multer = require('multer')
const uploadsDir = path.join(__dirname, 'uploads')
if(!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)
const storage = multer.diskStorage({ destination: uploadsDir, filename: (req,file,cb)=>{
	const ext = path.extname(file.originalname)
	cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`)
}})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

app.post('/upload', authenticateToken, upload.single('file'), (req,res)=>{
	if(!req.file) return res.status(400).json({status:'no_file'})
	const fileUrl = `/uploads/${req.file.filename}`
	res.json({status:'ok', file: { filename: req.file.filename, url: fileUrl, original: req.file.originalname }})
})

app.get('/uploads', authenticateToken, (req,res)=>{
	try{
		const files = fs.readdirSync(uploadsDir).map(f=>({ filename: f, url: `/uploads/${f}` }))
		res.json({status:'ok', files})
	}catch(e){ res.status(500).json({status:'error'}) }
})

app.delete('/uploads/:name', authenticateToken, (req,res)=>{
	const name = req.params.name
	const file = path.join(uploadsDir, name)
	if(!fs.existsSync(file)) return res.status(404).json({status:'not_found'})
	try{ fs.unlinkSync(file); return res.json({status:'ok'}) }catch(e){ return res.status(500).json({status:'error'}) }
})

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir))

app.listen(port, ()=>console.log('Server listening on', port));
