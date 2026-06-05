import React from 'react'
import { Box, SimpleGrid, Image, Heading, Text, Link, Stack, Input, Button } from '@chakra-ui/react'

export default function Footer(){
  return (
    <Box as="footer" bg="gray.50" py={12} mt={8}>
      <Box maxW="7xl" mx="auto" px={{base:4, md:8}}>
        <SimpleGrid columns={{base:1, md:4}} spacing={8}>
          <Stack>
            <Image src="/assets/logo-Bybhg_qO.png" alt="Ba Ba Reeba" boxSize="72px" objectFit="contain" />
            <Text color="muted.500">An intimate hideaway serving crafted pours and moments.</Text>
          </Stack>

          <Stack>
            <Heading as="h4" size="sm">Explore</Heading>
            <Stack spacing={2}>
              <Link href="/menu">Menu</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
            </Stack>
          </Stack>

          <Stack>
            <Heading as="h4" size="sm">Contact</Heading>
            <Text>Pune, India · <Link href="https://wa.me/917219694001">+91 72196 94001</Link></Text>
            <Link href="https://www.instagram.com/babareeba.pune">@babareeba.pune</Link>
          </Stack>

          <Stack>
            <Heading as="h4" size="sm">Stay In The Loop</Heading>
            <Stack direction="row">
              <Input placeholder="you@domain.com" aria-label="Email" />
              <Button colorScheme="brand">Subscribe</Button>
            </Stack>
            <Stack direction="row" spacing={4} pt={2}>
              <Link href="https://www.instagram.com/babareeba.pune">Instagram</Link>
              <Link href="https://wa.me/917219694001">WhatsApp</Link>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Box borderTopWidth={1} borderColor="gray.100" mt={8} pt={6} textAlign="center">
          <Text fontSize="sm">© 2026 BA BA REEBA. ALL RIGHTS RESERVED.</Text>
        </Box>
      </Box>
    </Box>
  )
}
