import React from 'react'

const menuItems = [
  {name:'Matcha Mirage', desc:'Vibrant tea infusion', price:'₹450'},
  {name:'Roots & Fire', desc:'Clarified orchard spice', price:'₹420'},
  {name:'Moonlight Betel', desc:'Botanical spectacle', price:'₹480'},
]

export default function Menu(){
  return (
    <section className="section menu">
      <h2>Menu</h2>
      <div style={{display:'grid',gap:12}}>
        {menuItems.map(m=> (
          <div key={m.name} style={{background:'var(--card-bg)',padding:12,borderRadius:8}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <strong>{m.name}</strong>
              <span style={{color:'var(--muted)'}}>{m.price}</span>
            </div>
            <p style={{margin:6,color:'var(--muted)'}}>{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
