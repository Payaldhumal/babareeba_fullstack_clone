import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GalleryModal from '../components/GalleryModal'
import { Box, Heading, SimpleGrid, Image, Text, Stack, Button } from '@chakra-ui/react'

export const galleryImages = [
  '/assets/portfolio-2-B9bJUlp2.png',
  '/assets/portfolio-3-nQa-6nt-.png',
  '/assets/portfolio-5-BiZJQZAo.png',
  '/assets/portfolio-6-CZBTzKit.png',
  '/assets/portfolio-7-RRYbMGga.png',
  '/assets/portfolio-8-_OF5oWFU.png',
]

const signatureDrinks = [
  { title: 'Matcha Mirage', img: '/assets/1-DL1gWdqW.png' },
  { title: 'Roots & Fire', img: '/assets/2-CTWgW1OZ.png' },
  { title: 'Moonlight Betel', img: '/assets/3-BwABNt_l.png' },
  { title: "It's Not a Picante", img: '/assets/4-DJFncUz_.png' },
  { title: 'Chikoo Chiller', img: '/assets/5-BpdXL7YC.png' },
  { title: 'Forbidden Tropic', img: '/assets/6-BNdmjwdK.png' },
]

const galleryVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } }
}

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
}

export default function Home(){
  const [modalIndex, setModalIndex] = useState(null)
  return (
    <Box as="main" maxW="7xl" mx="auto" px={{base:4, md:8}}>
      <Box as="section" py={12}>
        <Heading as="h2" size="lg" mb={6}>Signature Crafts</Heading>
        <SimpleGrid columns={{base:1, sm:2, md:3}} gap={6}>
          {signatureDrinks.map((d, idx) => (
            <Box key={d.title} as={motion.article} whileHover={{scale:1.03}} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:idx*0.06, type:'spring', stiffness:260, damping:22}} bg="white" boxShadow="md" borderRadius="md" overflow="hidden">
              <Image src={d.img} alt={d.title} objectFit="cover" w="100%" h={48} />
              <Box p={4}>
                <Heading as="h3" size="sm">{d.title}</Heading>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box as="section" py={12}>
        <Heading as="h2" size="lg" mb={6}>Gallery</Heading>
        <SimpleGrid columns={{base:2, md:3}} gap={4}>
          {galleryImages.map((src, i) => (
            <Box key={i} as={motion.div} variants={itemVariant} whileHover={{ scale: 1.03 }} onClick={()=>setModalIndex(i)} cursor="pointer">
              <Image src={src} alt={`gallery-${i}`} loading="lazy" borderRadius="md" />
            </Box>
          ))}
        </SimpleGrid>
        <GalleryModal images={galleryImages} index={modalIndex} onClose={()=>setModalIndex(null)} onPrev={()=>setModalIndex(i=> (i===0?galleryImages.length-1:i-1))} onNext={()=>setModalIndex(i=> (i===galleryImages.length-1?0:i+1))} />
      </Box>

      <Box as="section" py={12}>
        <Heading as="h2" size="lg" mb={6}>What They Say</Heading>
        <Stack spacing={4}>
          {[
            '"Every detail whispers sophistication. From the jazz to the pour."',
            '"If secrets had a home, it would look like this. Intimate, bold, unforgettable."',
            '"The moment you step in, you feel it — not just a bar, a world."'
          ].map((t,i)=>(
            <Box as={motion.blockquote} key={i} whileHover={{y:-6}} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:220,damping:20,delay:i*0.04}} bg="white" p={4} borderRadius="md" boxShadow="sm">{t}</Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
