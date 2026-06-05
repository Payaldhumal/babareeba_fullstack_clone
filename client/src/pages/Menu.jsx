import React, { useState, useMemo } from 'react'
import { Box, Heading, Text, Input, SimpleGrid, Image, Stack, Badge } from '@chakra-ui/react'

const menuItems = [
  {name:'Matcha Mirage', desc:'Vibrant tea infusion — delicate matcha layered with citrus', price:'₹450', img:'/assets/portfolio-2-B9bJUlp2.png'},
  {name:'Roots & Fire', desc:'Clarified orchard spice with toasted bitters', price:'₹420', img:'/assets/portfolio-3-nQa-6nt-.png'},
  {name:'Moonlight Betel', desc:'Botanical spectacle with betel leaf finish', price:'₹480', img:'/assets/portfolio-5-BiZJQZAo.png'},
  {name:'Chikoo Chiller', desc:'Creamy chikoo, chilled and spiced', price:'₹400', img:'/assets/portfolio-6-CZBTzKit.png'},
  {name:'Forbidden Tropic', desc:'Tropical medley with smoky base', price:'₹460', img:'/assets/1-DL1gWdqW.png'},
]

export default function Menu(){
  const [q,setQ] = useState('')
  const items = useMemo(()=>{
    const term = q.trim().toLowerCase()
    if(!term) return menuItems
    return menuItems.filter(i=>i.name.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term))
  },[q])

  return (
    <Box as="section" py={12} maxW="7xl" mx="auto" px={{base:4, md:8}}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" gap={6}>
        <Box>
          <Heading as="h2" size="lg" id="menu-heading">Menu</Heading>
          <Text color="muted.500" mt={2}>Signature drinks and seasonal specials — handcrafted and limited.</Text>
        </Box>
        <Box minW={{base:'100%', md:220}} maxW={320}>
          <Input id="menu-search" placeholder="Search drinks" value={q} onChange={e=>setQ(e.target.value)} bg="whiteAlpha.50" />
        </Box>
      </Box>

      <SimpleGrid columns={{base:1, md:2, lg:3}} gap={6} mt={6}>
        {items.map(item => (
          <Box key={item.name} as="article" bg="whiteAlpha.50" borderRadius="md" overflow="hidden" boxShadow="md" tabIndex={0}>
            <Image src={item.img} alt={item.name} objectFit="cover" w="100%" h={44} />
            <Box p={4}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Heading as="h3" size="sm">{item.name}</Heading>
                <Badge colorScheme="brand" variant="subtle">{item.price}</Badge>
              </Box>
              <Text color="muted.500" mt={3}>{item.desc}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
