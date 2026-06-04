import React, { useState } from 'react'

export default function Contact(){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [status,setStatus] = useState('')

  async function submit(e){
    e.preventDefault();setStatus('sending')
    try{
      const res = await fetch('http://localhost:5000/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)})
      if(res.ok){setStatus('sent');setForm({name:'',email:'',message:''})} else {setStatus('error')}
    }catch(err){setStatus('error')}
  }

  return (
    <section className="section contact" id="main">
      <h2>Contact / Reservation</h2>
      <form onSubmit={submit} style={{maxWidth:600,display:'grid',gap:10}} aria-labelledby="contact-heading">
        <label className="sr-only" htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />

        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />

        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />

        <button type="submit">Send</button>
        <div role="status" aria-live="polite">
          {status==='sending' && <div>Sending...</div>}
          {status==='sent' && <div>Message sent — thank you.</div>}
          {status==='error' && <div>Unable to send. Try later.</div>}
        </div>
      </form>
    </section>
  )
}
