import React, { useState, useRef } from 'react'
import { Box, Heading, Text, Stack, Input, Textarea, Button, useToast } from '@chakra-ui/react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Contact(){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [status,setStatus] = useState('')
  const [errors,setErrors] = useState({})
  const toast = useToast()
  const sending = status === 'sending'

  function validate(){
    const e = {}
    if(!form.name || form.name.trim().length < 2) e.name = 'Please enter your name'
    if(!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if(!form.message || form.message.trim().length < 6) e.message = 'Please enter a message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submit(e){
    e.preventDefault()
    if(!validate()) return
    setStatus('sending')
    try{
      const res = await fetch(`${API}/contact`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)})
      if(res.ok){setStatus('sent');setForm({name:'',email:'',message:''});setErrors({});toast({status:'success',title:'Message sent — thank you.'})} else {setStatus('error');toast({status:'error',title:'Unable to send'})}
    }catch(err){setStatus('error');toast({status:'error',title:'Unable to send'})}
    setTimeout(()=>setStatus(''),3000)
  }

  return (
    <Box as="section" py={12} maxW="7xl" mx="auto" px={{base:4, md:8}} id="main" aria-labelledby="contact-heading">
      <Heading as="h2" size="lg" id="contact-heading">Contact / Reservation</Heading>
      <Box display={{md:'grid'}} gridTemplateColumns={{md:'1fr 320px'}} gap={8} mt={6}>
        <Box as="form" onSubmit={submit} noValidate>
          <Text color="muted.500" id="contact-desc">Reservations and general enquiries — we reply within 24 hours.</Text>

          <Stack spacing={4} mt={4}>
            <Box>
              <Input id="name" name="name" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} isInvalid={!!errors.name} />
              {errors.name && <Text color="red.400" mt={2}>{errors.name}</Text>}
            </Box>

            <Box>
              <Input id="email" name="email" type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} isInvalid={!!errors.email} />
              {errors.email && <Text color="red.400" mt={2}>{errors.email}</Text>}
            </Box>

            <Box>
              <Textarea id="message" name="message" placeholder="Message / Reservation details" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} isInvalid={!!errors.message} />
              {errors.message && <Text color="red.400" mt={2}>{errors.message}</Text>}
            </Box>

            <Box display="flex" gap={4} alignItems="center">
              <Button type="submit" colorScheme="brand" isLoading={sending}>{sending? 'Sending…':'Send'}</Button>
              <Text role="status" aria-live="polite">
                {status==='sending' && 'Sending...'}
                {status==='sent' && 'Message sent — thank you.'}
                {status==='error' && 'Unable to send. Try later.'}
              </Text>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Box bg="whiteAlpha.50" p={4} borderRadius="md" mb={4}>
            <Heading as="h3" size="sm">Visit Us</Heading>
            <Text color="muted.500" mt={2}>Open daily · 6pm — 1am</Text>
            <Text color="muted.500" mt={2}>For reservations please include date, time and party size.</Text>
          </Box>

          <Box bg="whiteAlpha.50" p={4} borderRadius="md">
            <Heading as="h3" size="sm">Contact</Heading>
            <Text color="muted.500" mt={2}>Email: contact@babareeba.club</Text>
            <Text color="muted.500" mt={2}>Phone: +91 7219694001</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
