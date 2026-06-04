import React, { useState, useMemo } from 'react'

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
    <section className="section menu" aria-labelledby="menu-heading">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:12}}>
        <div>
          <h2 id="menu-heading">Menu</h2>
          <p style={{color:'var(--muted)',marginTop:6}}>Signature drinks and seasonal specials — handcrafted and limited.</p>
        </div>
        <div style={{minWidth:220}}>
          <label className="sr-only" htmlFor="menu-search">Search menu</label>
          <input id="menu-search" placeholder="Search drinks" value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:10,borderRadius:10,border:'1px solid rgba(255,255,255,0.04)',background:'transparent',color:'#fff'}} />
        </div>
      </div>

      <div className="menu-grid" style={{marginTop:18}}>
        {items.map(item => (
          <article key={item.name} className="menu-item card" tabIndex={0}>
            <div className="menu-media">
              <img src={item.img} alt={item.name} />
            </div>
            <div className="menu-body">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <h3>{item.name}</h3>
                <div className="menu-price">{item.price}</div>
              </div>
              <p style={{color:'var(--muted)',marginTop:8}}>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
