import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import setAuthToken from '../../utils/jwttok'
import jwtDecode from 'jwt-decode'
export default function HomeCard({book,tokUser,books}) {

  const [more,setmore]=useState(false)
const hid=book.hid

  useEffect((tokUser) => {
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      tokUser = jwtDecode(jwt);
      console.log(tokUser)
      console.log(tokUser.id)
    
  }
  

  }, []); 
 const router =useRouter()


  const removeBook = async () => {
    try {
      console.log("delete")
      const res = await axios.delete(`http://localhost:8800/homework/${book.hid}`,{params:{hid:book.hid}});
        setbooks(books.filter(obj=>obj.bid!=book.bid))
  
  


     
    


       console.log("Data deleted",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
  
 <div className='bookcover' style={{display:'flex',flexDirection:'column', alignItems:'center' ,  padding:10, paddingTop:0}}>
 <div style={{backgroundColor:'white', display:'flex', justifyContent:"center", alignItems:'center'}}>
 <Link href={book.homelink}><img style={{height:128}} src='../hom.png'/></Link>
 </div> 

  <div style={{display:'flex', alignSelf:'flex-end'}}>
   {tokUser.job==1 && <Link href={`/checkwork/${book.hid}`} style={{display:'flex', alignItems:'center', textDecoration:'none',color:'black', fontSize:'small'}}  className='book-button'>Изменить оценку<img className='book-image' src='../edit.png'/></Link>}
   {tokUser.job==0 && <button onClick={()=>removeBook()} className='book-button'><img className='book-image' src='../trash.png'/></button>
}


  </div>
  <div style={{display:'flex',flexDirection:'column',gap:10,margin:10,}}>
    <span style={{fontWeight:'bold',fontSize:18}}>{book.homename}</span>
    <span style={{fontStyle:'italic'}}>{book.teacher}</span>
    <span>Проверено: {book.checked?"+":"-"}</span>
    {book.mark?<span>Оценка: {book.mark}</span>:null}
    {book.credit?<span>Зачтено: {book.credit}</span>:null}

  </div>

    <div style={{display:'flex', alignSelf:'flex-end'}}>

    <small  style={{color:'grey', alignSelf:'flex-end',padding:10}}> {book.publish}</small>

  </div>


 </div>
 
  )
}
