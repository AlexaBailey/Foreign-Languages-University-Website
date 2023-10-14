import React from 'react'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';

import axios from 'axios';
import setAuthToken from '../utils/jwttok';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import ChosenCard from './components/ChosenCard';
import Link from 'next/link';

export default function ChosenBooks() {
    const [books, setbooks] = useState('');  
    const [spec, setSpec] = useState(null)
const router = useRouter()
    const [mount,setmount]=useState(false)
    const [chosen,setchosen]=useState('')
  const [name,setName]=useState('')


    let tokUser;
    const handleSpec = (spec) => {
      console.log(spec)
      setSpec(spec);
    }
    useEffect((tokUser) => {
        setmount(true)
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          tokUser = jwtDecode(jwt);
          console.log(tokUser)
          console.log(tokUser.id)
        
      }
        const getData = async () => {
          
   

          try {
            console.log("id",tokUser.id)

        
            
            const res = await axios.get(`http://localhost:8800/chosen/${tokUser.id}`,{params:{id:tokUser.id}});
       
            setbooks(res.data);

     

            console.log(books)
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getData();
    

      }, []); 
      const sortByYearAsc = () => {
        const copybooks = [];
        for (const example of books){
         
          copybooks.push(example)
        }
           copybooks.sort((a,b)=>a.writedate-b.writedate)
           console.log(copybooks)
         
          
        
        setbooks(copybooks)
      
      
      
        };
      
              
            
      const sortByYearDesc = () => {
        const copybooks = [];
        for (const example of books){
         
          copybooks.push(example)
        }
           copybooks.sort((a,b)=>b.writedate-a.writedate)
           console.log(copybooks)
         
          
        
        setbooks(copybooks)
      
      
      
        };
      const handleSubmit= async (e) => {
        try {
          e.preventDefault()
          console.log("form")
          const res = await axios.post(`http://localhost:8800/search/${tokUser.id}`,{params:{id:tokUser.id},name:name});
          setbooks(res.data);
     

           console.log("Data form",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      
  

      axios.defaults.withCredentials = true;
      if (mount){
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          tokUser = jwtDecode(jwt);
          console.log(tokUser)
      }
  return (
    <main>
        <Navbar/>
        <div className='repos' style={{display:'flex', justifyContent:'center'}}> 
        <img style={{alignSelf:'center'}} className='hero-image' src='./fav.png'/>


    </div>
    <div id="section" style={{display:'flex',flexDirection:'column'}}  className='repos'>
     
           
  
      <div  style={{display:'flex',justifyContent:'center'}}>
        
  
             

              <div style={{display:'flex', alignItems:'center',gap:10}}>
              <form onSubmit={handleSubmit} className='searchform' style={{display:'flex', alignItems:'center', justifyContent:'space-between',gap:10}}>
              <input name='name' onChange={(e)=>setName(e.target.value)} className='searchbar' placeholder='Заголовок учебника'/>
              <button onClick={handleSubmit} style={{border:'none', background:'transparent'}}> <img style={{height:40}} src='./search.png'/></button>

              </form>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
            <button className='sort'  id="asc" onClick={sortByYearAsc}>Старые-новые</button>
            <button className='sort'  id="desc" onClick={sortByYearDesc}>Новые-старые</button>
            </div>
          
            




        </div>

              
              </div>
              {books && books!=''? 
     <div class="book-container">
     <div class="book-box">
       {
books.map((book)=>{
  
  return(
            <ChosenCard 
            key={book.bid}
            book={book}
           tokUser={tokUser}
             setbooks={setbooks}
             books={books}
          />
        )})}</div></div>:<div style={{display:'flex',flexDirection:'column', alignItems:'center',gap:8}}><span>Ничего не найдено</span><img style={{height:300}} src='./nothing.jpg'/></div>}
   

  
   </div>
   


   <Footer/>
    </main>
    
  )
}
else{
    return null
}
}
