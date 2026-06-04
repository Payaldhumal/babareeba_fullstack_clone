import React, { useEffect, useState } from 'react'

const API = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'

export default function Admin(){
  const [contacts,setContacts] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [token,setToken] = useState(() => localStorage.getItem('admin_token'))
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [uploads,setUploads] = useState([])
  const [selectedFile,setSelectedFile] = useState(null)
  const [uploading,setUploading] = useState(false)

  useEffect(()=>{
    if(token) loadContacts()
    if(token) loadUploads()
  },[token])

  async function login(e){
    e.preventDefault()
    setError(null)
    try{
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username,password})
      })
      const json = await res.json()
      if(!res.ok) throw new Error(json.status || 'login_failed')
      localStorage.setItem('admin_token', json.token)
      setToken(json.token)
      setUsername('')
      setPassword('')
    }catch(err){ setError(err.message || 'Login error') }
  }

  function logout(){
    localStorage.removeItem('admin_token')
    setToken(null)
    setContacts([])
  }

  async function loadContacts(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetch(`${API}/contacts`, { headers: { Authorization: `Bearer ${token}` } })
      if(res.status === 401 || res.status === 403){
        logout();
        throw new Error('Unauthorized — please login')
      }
      const json = await res.json()
      setContacts(json.contacts || [])
    }catch(err){ setError(err.message||'Failed to load') }
    setLoading(false)
  }

  async function loadUploads(){
    try{
      const res = await fetch(`${API}/uploads`, { headers: { Authorization: `Bearer ${token}` } })
      if(!res.ok) throw new Error('Failed to load uploads')
      const json = await res.json()
      setUploads(json.files || [])
    }catch(err){ console.warn('Uploads load failed', err); setUploads([]) }
  }

  async function uploadFile(e){
    e.preventDefault()
    if(!selectedFile) return
    setUploading(true)
    const form = new FormData()
    form.append('file', selectedFile)
    try{
      const res = await fetch(`${API}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const json = await res.json()
      if(!res.ok) throw new Error(json.status || 'upload_failed')
      setSelectedFile(null)
      await loadUploads()
    }catch(err){ setError(err.message||'Upload failed') }
    setUploading(false)
  }

  async function deleteUpload(name){
    if(!confirm('Delete this file?')) return
    try{
      const res = await fetch(`${API}/uploads/${encodeURIComponent(name)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if(!res.ok) throw new Error('Delete failed')
      await loadUploads()
    }catch(err){ setError(err.message||'Delete failed') }
  }

  if(!token){
    return (
      <section className="section admin">
        <h2>Admin Login</h2>
        <form onSubmit={login} style={{maxWidth:420}}>
          {error && <div style={{color:'crimson',marginBottom:8}}>{error}</div>}
          <div style={{marginBottom:8}}>
            <label>Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} required />
          </div>
          <div style={{marginBottom:8}}>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="section admin">
      <h2>Contact Submissions</h2>
      <div style={{marginBottom:12}}>
        <button onClick={loadContacts} disabled={loading} style={{marginRight:8}}>Refresh</button>
        <button onClick={logout}>Logout</button>
      </div>
      <section style={{marginTop:12,marginBottom:18}}>
        <h3>Uploads</h3>
        {error && <div style={{color:'crimson',marginBottom:8}}>{error}</div>}
        <form onSubmit={uploadFile} style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
          <input type="file" accept="image/*" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} />
          <button type="submit" disabled={uploading || !selectedFile}>{uploading? 'Uploading...':'Upload'}</button>
        </form>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          {uploads.map(f=> (
            <div key={f.filename} style={{width:120}}>
              <img src={`${API}/uploads/${f.filename}`} alt={f.filename} style={{width:'100%',height:80,objectFit:'cover',borderRadius:6}} />
              <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:12}}>
                <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:72}}>{f.filename}</span>
                <button onClick={()=>deleteUpload(f.filename)} style={{background:'transparent',border:0,color:'crimson'}}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {loading && <div>Loading...</div>}
      {error && <div style={{color:'crimson'}}>{error}</div>}
      {!loading && contacts.length===0 && <div>No submissions yet.</div>}
      <ul style={{listStyle:'none',padding:0}}>
        {contacts.map(c=> (
          <li key={c.id} style={{border:'1px solid rgba(0,0,0,0.08)',padding:12,marginBottom:8}}>
            <div style={{fontWeight:700}}>{c.name} <span style={{fontWeight:400,marginLeft:8,fontSize:12,color:'#666'}}>{c.email}</span></div>
            <div style={{marginTop:6,whiteSpace:'pre-wrap'}}>{c.message}</div>
            <div style={{marginTop:6,fontSize:12,color:'#888'}}>{c.receivedAt}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
