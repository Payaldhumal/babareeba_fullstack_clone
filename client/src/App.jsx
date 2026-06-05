
import React from 'react'
import { Box, Container, Heading, Text, Button, SimpleGrid, Image } from '@chakra-ui/react'
import MotionBox from './components/MotionBox'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Home, { galleryImages } from './pages/Home'
import { motion } from 'framer-motion'



export default function App() {
  return (
    <BrowserRouter>
      <Box minH="100%" bg="gray.900" color="white">
        <Nav />
        <MotionBox as="header" bg="linear-gradient(180deg, rgba(0,0,0,0.02), transparent)" py={16} initial="hidden" animate="show" variants={{hidden:{opacity:0,y:8}, show:{opacity:1,y:0,transition:{staggerChildren:0.12}}}}>
          <Container maxW="7xl">
            <MotionBox textAlign="center" initial={{opacity:0}} animate={{opacity:1}}>
              <Box as="img" src="/assets/logo-Bybhg_qO.png" alt="Ba Ba Reeba" mx="auto" w={28} mb={4} />
              <Heading as="h1" size="2xl" mb={4}>BA BA REEBA</Heading>
              <Text fontSize="lg" mb={6}>This isn't just a bar — it's a vault for those who live with intention.</Text>
              <Button as="a" href="/contact" colorScheme="brand">Reservation</Button>
            </MotionBox>
          </Container>
        </MotionBox>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/gallery" element={<Box as="section" py={12} maxW="7xl" mx="auto" px={{base:4, md:8}}>
              <Heading as="h2" size="lg" mb={6}>Gallery</Heading>
              <SimpleGrid columns={{base:2, md:3}} gap={4}>
                {galleryImages.map((s,i)=>(<Image key={i} src={s} alt={`gallery-${i}`} borderRadius="md" />))}
              </SimpleGrid>
            </Box>} />
          </Routes>
        </main>
        <Footer />
      </Box>
    </BrowserRouter>
  )
}
