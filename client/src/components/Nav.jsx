import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './nav.css'
import React, { useState } from 'react'

export default function Nav(){
  const linkVariant = { hover: { y: -2 }, tap: { scale: 0.98 } }
  const [open, setOpen] = useState(false)
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <NavLink to="/" className="nav-logo">BA BA REEBA</NavLink>
        </div>
        <div className="nav-right">
          <div className="desktop-links">
            <motion.div variants={linkVariant} whileHover="hover" whileTap="tap"><NavLink to="/menu" className={({isActive}) => isActive? 'nav-link active':'nav-link'}>MENU</NavLink></motion.div>
            <motion.div variants={linkVariant} whileHover="hover" whileTap="tap"><NavLink to="/gallery" className={({isActive}) => isActive? 'nav-link active':'nav-link'}>GALLERY</NavLink></motion.div>
            <motion.div variants={linkVariant} whileHover="hover" whileTap="tap"><NavLink to="/contact" className={({isActive}) => isActive? 'nav-link active':'nav-link'}>CONTACT</NavLink></motion.div>
          </div>
          <button className={`nav-burger ${open? 'open':''}`} aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>
            <motion.span className="burger-line" animate={open?{rotate:45,y:6}:{rotate:0,y:0}} transition={{duration:0.18}} />
            <motion.span className="burger-line" animate={open?{opacity:0}:{opacity:1}} transition={{duration:0.12}} />
            <motion.span className="burger-line" animate={open?{rotate:-45,y:-6}:{rotate:0,y:0}} transition={{duration:0.18}} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{type:'spring'}}>
            <NavLink to="/menu" className="mobile-link" onClick={()=>setOpen(false)}>MENU</NavLink>
            <NavLink to="/gallery" className="mobile-link" onClick={()=>setOpen(false)}>GALLERY</NavLink>
            <NavLink to="/contact" className="mobile-link" onClick={()=>setOpen(false)}>CONTACT</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
