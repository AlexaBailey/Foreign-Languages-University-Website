import React from 'react'

export default function NewsCard({newsitem}) {
  return (
    <>
       <div className='home-main'>
    <div className='home'>
      <img style={{height:180}} src={newsitem.nlink}/>
      <span > <b>{newsitem.ntitle}</b><br/>{newsitem.comments} </span>
  </div>

  </div>
  <hr/>
  
    </>
 
  




  )
}
