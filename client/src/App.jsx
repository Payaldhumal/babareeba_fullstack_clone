
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { motion } from 'framer-motion'
import GalleryModal from './components/GalleryModal'
import { useState } from 'react'

const galleryVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } }
}

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
}

const signatureDrinks = [
  { title: 'Matcha Mirage', img: '/assets/1-DL1gWdqW.png' },
  { title: 'Roots & Fire', img: '/assets/2-CTWgW1OZ.png' },
  { title: 'Moonlight Betel', img: '/assets/3-BwABNt_l.png' },
  { title: "It's Not a Picante", img: '/assets/4-DJFncUz_.png' },
  { title: 'Chikoo Chiller', img: '/assets/5-BpdXL7YC.png' },
  { title: 'Forbidden Tropic', img: '/assets/6-BNdmjwdK.png' },
]

const galleryImages = [
  '/assets/portfolio-2-B9bJUlp2.png',
  '/assets/portfolio-3-nQa-6nt-.png',
  '/assets/portfolio-5-BiZJQZAo.png',
  '/assets/portfolio-6-CZBTzKit.png',
  '/assets/portfolio-7-RRYbMGga.png',
  '/assets/portfolio-8-_OF5oWFU.png',
]

export default function App() {
  const [modalIndex, setModalIndex] = useState(null)
  return (
    <BrowserRouter>
      <div className="app-root">
        <Nav />
          <motion.header className="hero" initial="hidden" animate="show" variants={{hidden:{opacity:0,y:8}, show:{opacity:1,y:0,transition:{staggerChildren:0.12}}}}>
            <motion.div className="hero-inner" variants={{hidden:{opacity:0},show:{opacity:1}}}>
              <motion.img className="hero-logo" src="/assets/logo-Bybhg_qO.png" alt="Ba Ba Reeba" variants={{hidden:{opacity:0,scale:0.96},show:{opacity:1,scale:1,transition:{duration:0.36,ease:'easeOut'}}}} />
              <motion.h1 className="hero-title" variants={{hidden:{opacity:0,y:8},show:{opacity:1,y:0,transition:{duration:0.46,ease:'easeOut'}}}}>BA BA REEBA</motion.h1>
              <motion.p className="hero-sub" variants={{hidden:{opacity:0,y:6},show:{opacity:1,y:0,transition:{duration:0.46}}}}>This isn't just a bar — it's a vault for those who live with intention.</motion.p>
              <motion.a className="nav-cta" href="/contact" variants={{hidden:{opacity:0,scale:0.98},show:{opacity:1,scale:1,transition:{duration:0.36}}}}>Reservation</motion.a>
            </motion.div>
          </motion.header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <section className="section signature">
                  <h2>Signature Crafts</h2>
                  <div className="cards">
                    {signatureDrinks.map((d, idx) => (
                          <motion.article key={d.title} className="card" whileHover={{scale:1.06, rotateX:4, rotateY:4}} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:idx*0.06, type:'spring', stiffness:260, damping:22}}>
                        <img src={d.img} alt={d.title} />
                        <h3>{d.title}</h3>
                      </motion.article>
                    ))}
                  </div>
                </section>

                <section className="section gallery">
                  <h2>Gallery</h2>
                  <motion.div className="grid" variants={galleryVariants} initial="hidden" animate="show">
                    {galleryImages.map((src, i) => (
                      <motion.div key={i} className="grid-item" variants={itemVariant} whileHover={{ scale: 1.03 }} onClick={()=>setModalIndex(i)}>
                        <img src={src} alt={`gallery-${i}`} loading="lazy" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <GalleryModal images={galleryImages} index={modalIndex} onClose={()=>setModalIndex(null)} onPrev={()=>setModalIndex(i=> (i===0?galleryImages.length-1:i-1))} onNext={()=>setModalIndex(i=> (i===galleryImages.length-1?0:i+1))} />
                </section>

                <section className="section testimonials">
                  <h2>What They Say</h2>
                  <motion.div className="testimonials-list" initial="hidden" animate="show" variants={{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:0.08,delayChildren:0.15}}}}>
                    {[
                      '"Every detail whispers sophistication. From the jazz to the pour."',
                      '"If secrets had a home, it would look like this. Intimate, bold, unforgettable."',
                      '"The moment you step in, you feel it — not just a bar, a world."'
                    ].map((t,i)=>(
                      <motion.blockquote key={i} whileHover={{y:-6}} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:220,damping:20,delay:i*0.04}}>{t}</motion.blockquote>
                    ))}
                  </motion.div>
                </section>
              </>
            } />

            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/gallery" element={<div className="section"><h2>Gallery</h2><div className="grid">{galleryImages.map((s,i)=>(<div key={i} className="grid-item"><img src={s} alt={i} /></div>))}</div></div>} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/assets/logo-Bybhg_qO.png" alt="Ba Ba Reeba" style={{width:72}} />
              <p className="muted">An intimate hideaway serving crafted pours and moments.</p>
            </div>

            <div className="footer-links-col">
              <h4>Explore</h4>
              <nav className="footer-links">
                <a href="/menu">Menu</a>
                <a href="/gallery">Gallery</a>
                <a href="/contact">Contact</a>
              </nav>
            </div>

            <div className="footer-contact-col">
              <h4>Contact</h4>
              <div className="muted">Pune, India · <a href="https://wa.me/917219694001">+91 72196 94001</a></div>
              <div style={{marginTop:8}}><a href="https://www.instagram.com/babareeba.pune">@babareeba.pune</a></div>
            </div>

            <div className="footer-newsletter">
              <h4>Stay In The Loop</h4>
              <form className="newsletter-form" onSubmit={(e)=>{e.preventDefault(); alert('Thanks — you\'re subscribed (demo)')}}>
                <input aria-label="Email" name="email" placeholder="you@domain.com" />
                <button className="nav-cta" type="submit">Subscribe</button>
              </form>
              <div className="social-links" aria-hidden>
                <a href="https://www.instagram.com/babareeba.pune">Instagram</a>
                <a href="https://wa.me/917219694001">WhatsApp</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">© 2026 BA BA REEBA. ALL RIGHTS RESERVED.</div>
            <button className="back-to-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top</button>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
