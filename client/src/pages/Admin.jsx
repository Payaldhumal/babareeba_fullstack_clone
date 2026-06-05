import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, Stack, Text, Image, SimpleGrid, useToast } from '@chakra-ui/react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Admin(){
  const [contacts,setContacts] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [token,setToken] = useState(() => localStorage.getItem('admin_token'))
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [uploads,setUploads] = useState([])
  const [selectedFile,setSelectedFile] = useState(null)
  const [uploading,setUploading] = useState(false)
  const toast = useToast()

  useEffect(()=>{
    if(token) loadContacts()
    if(token) loadUploads()
  },[token])

  async function login(e){
    e.preventDefault()
    setError(null)
    try{
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username,password})
      })
      const json = await res.json()
      if(!res.ok) throw new Error(json.status || 'login_failed')
      localStorage.setItem('admin_token', json.token)
      setToken(json.token)
      setUsername('')
      setPassword('')
      toast({status:'success',title:'Logged in'})
    }catch(err){ setError(err.message || 'Login error') }
  }

  function logout(){
    localStorage.removeItem('admin_token')
    setToken(null)
    setContacts([])
  }

  async function loadContacts(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetch(`${API}/contacts`, { headers: { Authorization: `Bearer ${token}` } })
      if(res.status === 401 || res.status === 403){
        logout();
        throw new Error('Unauthorized — please login')
      }
      const json = await res.json()
      setContacts(json.contacts || [])
    }catch(err){ setError(err.message||'Failed to load') }
    setLoading(false)
  }

  async function loadUploads(){
    try{
      const res = await fetch(`${API}/uploads`, { headers: { Authorization: `Bearer ${token}` } })
      if(!res.ok) throw new Error('Failed to load uploads')
      const json = await res.json()
      setUploads(json.files || [])
    }catch(err){ console.warn('Uploads load failed', err); setUploads([]) }
  }

  async function uploadFile(e){
    e.preventDefault()
    if(!selectedFile) return
    setUploading(true)
    const form = new FormData()
    form.append('file', selectedFile)
    try{
      const res = await fetch(`${API}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const json = await res.json()
      if(!res.ok) throw new Error(json.status || 'upload_failed')
      setSelectedFile(null)
      await loadUploads()
      toast({status:'success',title:'Upload successful'})
    }catch(err){ setError(err.message||'Upload failed'); toast({status:'error',title:'Upload failed'}) }
    setUploading(false)
  }

  async function deleteUpload(name){
    if(!confirm('Delete this file?')) return
    try{
      const res = await fetch(`${API}/uploads/${encodeURIComponent(name)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if(!res.ok) throw new Error('Delete failed')
      await loadUploads()
      toast({status:'success',title:'Deleted'})
    }catch(err){ setError(err.message||'Delete failed'); toast({status:'error',title:'Delete failed'}) }
  }

  if(!token){
    return (
      <Box as="section" py={12} maxW="7xl" mx="auto" px={{base:4, md:8}}>
        <Heading as="h2" size="lg">Admin Login</Heading>
        <Box as="form" onSubmit={login} maxW={420} mt={4}>
          {error && <Text color="red.400" mb={3}>{error}</Text>}
          <Stack spacing={3}>
            <Input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
            <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <Button type="submit" colorScheme="brand">Sign In</Button>
          </Stack>
        </Box>
      </Box>
    )
  }

  return (
    <Box as="section" py={12} maxW="7xl" mx="auto" px={{base:4, md:8}}>
      <Heading as="h2" size="lg">Contact Submissions</Heading>
      <Box mt={4} display="flex" gap={3}>
        <Button onClick={loadContacts} isLoading={loading} colorScheme="brand">Refresh</Button>
        <Button onClick={logout} variant="ghost">Logout</Button>
      </Box>

      <Box mt={6}>
        <Heading as="h3" size="md" mb={3}>Uploads</Heading>
        {error && <Text color="red.400" mb={3}>{error}</Text>}
        <Box as="form" onSubmit={uploadFile} display="flex" gap={3} alignItems="center" mb={4}>
          <Input type="file" accept="image/*" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} />
          <Button type="submit" isLoading={uploading} colorScheme="brand" disabled={!selectedFile}>{uploading? 'Uploading...':'Upload'}</Button>
        </Box>
        <SimpleGrid columns={{base:2, md:4}} gap={3}>
          {uploads.map(f=> (
            <Box key={f.filename}>
              <Image src={`${API}/uploads/${f.filename}`} alt={f.filename} objectFit="cover" w="100%" h={24} borderRadius="md" />
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} fontSize="sm">
                <Text isTruncated maxW={72}>{f.filename}</Text>
                <Button size="sm" onClick={()=>deleteUpload(f.filename)} colorScheme="red" variant="ghost">Delete</Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {loading && <Text mt={4}>Loading...</Text>}
      {!loading && contacts.length===0 && <Text mt={4}>No submissions yet.</Text>}

      <Stack mt={6} spacing={3}>
        {contacts.map(c=> (
          <Box key={c.id} borderWidth={1} borderColor="whiteAlpha.100" p={3} borderRadius="md">
            <Box fontWeight={700}>{c.name} <Text as="span" fontWeight={400} ml={3} fontSize="sm" color="muted.500">{c.email}</Text></Box>
            <Text mt={2} whiteSpace="pre-wrap">{c.message}</Text>
            <Text mt={2} fontSize="sm" color="muted.500">{c.receivedAt}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
