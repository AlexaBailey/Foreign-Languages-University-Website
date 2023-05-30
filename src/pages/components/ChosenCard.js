import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import setAuthToken from '../../utils/jwttok'
import jwtDecode from 'jwt-decode'
export default function  ChosenCard({book,tokUser,setbooks,books}) {
  const [more,setmore]=useState(false)
  function toggleMore(){
    setmore(curr=>!curr)
  }
  const deleteChosen = async () => {
    try {

    
     
  


      
       const res = await axios.post(`http://localhost:8800/disliked/${book.bid}/${tokUser.id}`,{ id: book.bid, userid:tokUser.id});
       setbooks(books.filter(obj=>obj.bid!=book.bid))

    } catch (err) {
      console.log(err);
    }
  };
  return (
  
 <div className='bookcover' style={{display:'flex',flexDirection:'column', alignItems:'center', padding:10, paddingTop:0}}>
  <Link href={book.booklink}><img style={{height:300}} src='../book.png'/></Link>
  <div style={{display:'flex', alignSelf:'flex-end'}}>
    <button onClick={()=>deleteChosen()} className='book-button'><img className='book-image' src='../yellowstar.png'/></button>


  </div>
  {!more?
  <div style={{display:'flex',flexDirection:'column',gap:10,margin:10}}>
    <span style={{fontWeight:'bold',fontSize:18}}>{book.btitle}</span>
    <span style={{fontStyle:'italic'}}>{book.writers}. {book.writedate}</span>

  </div>
  :    <span style={{fontStyle:'italic'}}> {book.comments}</span>
}
    <div style={{display:'flex', alignSelf:'flex-end'}}>
    <button onClick={()=>toggleMore()} className='book-button'><img className='book-image' src='../more.png'/></button>

    <small  style={{color:'grey', alignSelf:'flex-end',padding:10}}> {book.publish}</small>

  </div>


 </div>
 
  )
}
