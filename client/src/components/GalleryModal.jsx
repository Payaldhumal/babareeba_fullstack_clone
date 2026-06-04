import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GalleryModal({images, index, onClose, onPrev, onNext}){
  useEffect(()=>{
    function onKey(e){
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowLeft') onPrev()
      if(e.key==='ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    // lock scroll
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return ()=>{
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  },[onClose,onPrev,onNext])

  if(index == null) return null
  return (
    <AnimatePresence>
      <motion.div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true"
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.18}}>
        <motion.div className="modal-inner" onClick={e=>e.stopPropagation()} initial={{scale:0.98,y:8}} animate={{scale:1,y:0}} exit={{scale:0.98,y:8}} transition={{duration:0.18}}>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          <button className="modal-nav left" onClick={onPrev} aria-label="Previous">‹</button>
          <motion.img src={images[index]} alt={`gallery-${index}`} initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.98}} transition={{duration:0.2}}
            drag="x" dragConstraints={{left:0,right:0}} onDragEnd={(e,info)=>{
              if(Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 600){
                if(info.offset.x < 0) onNext()
                else onPrev()
              }
            }} />
          <button className="modal-nav right" onClick={onNext} aria-label="Next">›</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
