import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import setAuthToken from '../../utils/jwttok'
import jwtDecode from 'jwt-decode'
export default function BookCard({book,tokUser,chosen,setbooks,books,setchosen}) {

  const [more,setmore]=useState(false)
const bid=book.bid
const [star,setStar]=useState(false)

const [numoflikes,setNum]=useState(0)
function toggleMore(){
  setmore(curr=>!curr)
}
  useEffect((tokUser) => {
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      tokUser = jwtDecode(jwt);
      console.log(tokUser)
      console.log(tokUser.id)
    
  }
  if (chosen.length>0)
  setStar(true)

    const getData = async () => {
      


      try { 
        console.log("id",tokUser.id)
      
    
        
        const res = await axios.get(`http://localhost:8800/likes/${book.bid}/${tokUser.id}`,{params:{userid:tokUser.id, id:book.bid}});
   
        setNum(res.data[0].num)

 

        
       
  
         console.log("Data",res.data[0].num)
      } catch (err) {
        console.log(err);
      }
    };
    getData();


  }, []); 
 console.log(chosen)
 const router =useRouter()

  const addLike = async () => {
    try {
    
        setStar(true)
        setNum(curr=>curr+1)
      
      
       const res=await axios.post(`http://localhost:8800/liked/${book.bid}/${tokUser.id}/${book.usersid}`,{ id: book.bid, userid:tokUser.id, writerid:book.usersid});
     
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {
      setNum(curr=>curr-1)

    
     
   setStar(false)


      
       const res = await axios.post(`http://localhost:8800/disliked/${book.bid}/${tokUser.id}`,{ id: book.bid, userid:tokUser.id});
       
    } catch (err) {
      console.log(err);
    }
  };
  const removeBook = async () => {
    try {
      console.log("delete")
      const res = await axios.delete(`http://localhost:8800/books/${book.bid}`,{params:{bid:book.bid}});
        setbooks(books.filter(obj=>obj.bid!=book.bid))
  
  


     
    


       console.log("Data deleted",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
  
 <div className='bookcover' style={{display:'flex',flexDirection:'column', alignItems:'center' ,  padding:10, paddingTop:0}}>
  <Link href={book.booklink}><img style={{height:300}} src='../book.png'/></Link>
  <div style={{display:'flex', alignSelf:'flex-end'}}>
   {tokUser.job==1 && <> <Link href={`/editbook/${book.bid}`}  className='book-button'><img className='book-image' src='../edit.png'/></Link>
    <button onClick={()=>removeBook()} className='book-button'><img className='book-image' src='../trash.png'/></button>
</>}
    {!star? <button onClick={()=>addLike()} className='book-button'><img className='book-image' src='../star.png'/></button>:<button onClick={()=>removeLike()} className='book-button'><img className='book-image' src='../yellowstar.png'/></button>}


  </div>
  {!more?
  <div style={{display:'flex',flexDirection:'column',gap:10,margin:10,}}>
    <span style={{fontWeight:'bold',fontSize:18}}>{book.btitle}</span>
    <span style={{fontStyle:'italic'}}>{book.writers}. {book.writedate}</span>

  </div>
  :    <span style={{fontStyle:'italic'}}>{book.comments}</span>
}
    <div style={{display:'flex', alignSelf:'flex-end'}}>
    <button onClick={()=>toggleMore()} className='book-button'><img className='book-image' src='../more.png'/></button>

    <small  style={{color:'grey', alignSelf:'flex-end',padding:10}}> {book.publish}</small>

  </div>


 </div>
 
  )
}
