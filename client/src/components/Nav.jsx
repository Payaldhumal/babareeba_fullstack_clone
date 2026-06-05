import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Box, HStack, IconButton, useDisclosure, Stack, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

export default function Nav(){
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box as="nav" bg="transparent" px={{base:4, md:8}} py={4}>
      <Flex align="center" justify="space-between" maxW="7xl" mx="auto">
        <Heading as="h1" size="md"> <ChakraLink as={NavLink} to="/">BA BA REEBA</ChakraLink> </Heading>

        <HStack as="nav" spacing={6} display={{base:'none', md:'flex'}}>
          <ChakraLink as={NavLink} to="/menu">MENU</ChakraLink>
          <ChakraLink as={NavLink} to="/gallery">GALLERY</ChakraLink>
          <ChakraLink as={NavLink} to="/contact">CONTACT</ChakraLink>
        </HStack>

        <IconButton aria-label={isOpen? 'Close menu' : 'Open menu'} display={{md:'none'}} icon={isOpen? <CloseIcon/> : <HamburgerIcon/>} onClick={isOpen? onClose : onOpen} />
      </Flex>

      {isOpen && (
        <Box pb={4} display={{md:'none'}}>
          <Stack as="nav" spacing={3}>
            <ChakraLink as={NavLink} to="/menu" onClick={onClose}>MENU</ChakraLink>
            <ChakraLink as={NavLink} to="/gallery" onClick={onClose}>GALLERY</ChakraLink>
            <ChakraLink as={NavLink} to="/contact" onClick={onClose}>CONTACT</ChakraLink>
          </Stack>
        </Box>
      )}
    </Box>
  )
}
