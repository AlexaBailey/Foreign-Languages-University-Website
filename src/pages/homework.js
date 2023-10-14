import React from 'react'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';

import axios from 'axios';
import setAuthToken from '../utils/jwttok';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import HomeCard from './components/HomeCard';
import Link from 'next/link';

export default function Books() {
    const [books, setbooks] = useState('');  
    const [spec, setSpec] = useState(null)
const router = useRouter()
    const [mount,setmount]=useState(false)
  const [name,setName]=useState('')


    let tokUser;

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

        
            
            const res = await axios.get(`http://localhost:8800/homework/${tokUser.id}`,{params:{id:tokUser.id}});
       
            setbooks(res.data);
   

     

            console.log(books)
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getData();
    

      }, []); 
      

      
      const handleSubmit= async (e) => {
        try {
          e.preventDefault()
          console.log("form")
          const res = await axios.post(`http://localhost:8800/searchhomework/${tokUser.id}`,{params:{id:tokUser.id},name:name});
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
        <div className='repos' style={{display:'flex', justifyContent:'space-around',gap:30}}> 
        <img style={{alignSelf:'center'}} className='hero-image' src='./homework.jpg'/>

        <span className='font big' style={{paddingTop:10}}> Теперь можно сдавать дз 
<span className='blue-font'> онлайн   </span></span>
        
        


    </div>
    <div id="section" style={{display:'flex',flexDirection:'column'}}  className='repos'>
     
        {tokUser.job==0 &&     <Link  style={{color:'black', display:'flex',  alignItems:'center',gap:3}} href='/addhomework'>
          <img style={{height:30}} src="./add.png"/>
        
        <p>Добавить дз</p>
        </Link> }   

      <div style={{display:'flex',justifyContent:'space-between'}}>
        
      <div style={{display:'flex', alignItems:'center',gap:12}}>
  
             

              
                
            
               
              </div>
             

              <div style={{display:'flex', alignItems:'center',gap:10}}>
              <form onSubmit={handleSubmit} className='searchform' style={{display:'flex', alignItems:'center', justifyContent:'space-between',gap:10}}>
              <input name='name' onChange={(e)=>setName(e.target.value)} className='searchbar' placeholder='Заголовок учебника'/>
              <button onClick={handleSubmit} style={{border:'none', background:'transparent'}}> <img style={{height:40}} src='./search.png'/></button>

              </form>




        </div>

              
              </div>
              {books && books!=''? 
     <div class="book-container">
     <div class="book-box">
       {
books.map((book)=>{
  
  return(
            <HomeCard 
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
