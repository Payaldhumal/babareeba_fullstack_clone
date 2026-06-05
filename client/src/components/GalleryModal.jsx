import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Box, IconButton, Image, useBreakpointValue } from '@chakra-ui/react'
import MotionBox from './MotionBox'

export default function GalleryModal({images, index, onClose, onPrev, onNext}){
  useEffect(()=>{
    function onKey(e){
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowLeft') onPrev()
      if(e.key==='ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return ()=>{
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  },[onClose,onPrev,onNext])

  if(index == null) return null
  const navSize = useBreakpointValue({base:'sm', md:'md'})

  return (
    <AnimatePresence>
      <MotionBox
        position="fixed" inset={0} bg="rgba(0,0,0,0.75)" display="flex" alignItems="center" justifyContent="center" zIndex={120}
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.18}} onClick={onClose} role="dialog" aria-modal="true"
      >
        <MotionBox onClick={e=>e.stopPropagation()} maxW={{base:'92%', md:'80%'}} maxH="92%" display="flex" alignItems="center" justifyContent="center" position="relative"
          initial={{scale:0.98,y:8}} animate={{scale:1,y:0}} exit={{scale:0.98,y:8}} transition={{duration:0.18}}>

          <IconButton aria-label="Close" icon={<span>✕</span>} position="absolute" top={{base:3, md:-4}} right={{base:3, md:-4}} bg="gray.800" color="white" onClick={onClose} />

          <IconButton aria-label="Previous" icon={<span>‹</span>} position="absolute" left={{base:2, md:-10}} top="50%" transform="translateY(-50%)" bg="blackAlpha.600" color="white" onClick={onPrev} size={navSize} />

          <MotionBox as={Image}
            src={images[index]} alt={`gallery-${index}`} maxH="80vh" objectFit="cover" borderRadius="md" boxShadow="lg"
            initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.98}} transition={{duration:0.2}}
            drag="x" dragConstraints={{left:0,right:0}} onDragEnd={(e,info)=>{
              if(Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 600){
                if(info.offset.x < 0) onNext()
                else onPrev()
              }
            }}
          />

          <IconButton aria-label="Next" icon={<span>›</span>} position="absolute" right={{base:2, md:-10}} top="50%" transform="translateY(-50%)" bg="blackAlpha.600" color="white" onClick={onNext} size={navSize} />
        </MotionBox>
      </MotionBox>
    </AnimatePresence>
  )
}
