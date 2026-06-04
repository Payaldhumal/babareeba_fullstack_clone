import React, { useState, useRef } from 'react'

export default function Contact(){
  const [form,setForm] = useState({name:'',email:'',message:''})
  const [status,setStatus] = useState('')
  const [errors,setErrors] = useState({})
  const [showSuccess,setShowSuccess] = useState(false)
  const sending = status === 'sending'
  const formRef = useRef(null)

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
      const res = await fetch('http://localhost:5000/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)})
      if(res.ok){setStatus('sent');setForm({name:'',email:'',message:''});setShowSuccess(true);setErrors({})} else {setStatus('error')}
    }catch(err){setStatus('error')}
    setTimeout(()=>setStatus(''),3000)
  }

  return (
    <section className="section contact" id="main" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact / Reservation</h2>
      <div className="contact-grid">
        <form ref={formRef} onSubmit={submit} className="contact-form" aria-describedby="contact-desc" noValidate>
          <p id="contact-desc" style={{color:'var(--muted)'}}>Reservations and general enquiries — we reply within 24 hours.</p>

          <div className={`field ${form.name? 'has-value':''}`}>
            <input id="name" name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            <label htmlFor="name">Your name</label>
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className={`field ${form.email? 'has-value':''}`}>
            <input id="email" name="email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            <label htmlFor="email">Email address</label>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className={`field ${form.message? 'has-value':''}`}>
            <textarea id="message" name="message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
            <label htmlFor="message">Message / Reservation details</label>
            {errors.message && <div className="field-error">{errors.message}</div>}
          </div>

          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <button type="submit" className="nav-cta" disabled={sending} aria-disabled={sending}>{sending? 'Sending…':'Send'}</button>
            <div role="status" aria-live="polite">
              {status==='sending' && <span className="status status-sending">Sending...</span>}
              {status==='sent' && <span className="status status-sent">Message sent — thank you.</span>}
              {status==='error' && <span className="status status-error">Unable to send. Try later.</span>}
            </div>
          </div>
        </form>

        <aside className="contact-aside">
          <div className="card">
            <h3>Visit Us</h3>
            <p style={{color:'var(--muted)'}}>Open daily · 6pm — 1am</p>
            <p style={{color:'var(--muted)'}}>For reservations please include date, time and party size.</p>
          </div>

          <div className="card">
            <h3>Contact</h3>
            <p style={{color:'var(--muted)'}}>Email: contact@babareeba.club</p>
            <p style={{color:'var(--muted)'}}>Phone: +91 7219694001</p>
          </div>
        </aside>
      </div>

      {showSuccess && (
        <div className="success-modal" role="dialog" aria-modal="true" aria-label="Message sent">
          <div className="success-inner">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="#9fe3b7" strokeWidth="1.5"/><path d="M7 13l3 3 7-8" stroke="#9fe3b7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h3>Thanks — we received your message</h3>
            <p style={{color:'var(--muted)'}}>We'll get back to you shortly.</p>
            <button className="nav-cta" onClick={()=>setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
