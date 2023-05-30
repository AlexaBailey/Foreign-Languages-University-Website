import React from 'react'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';

import axios from 'axios';
import setAuthToken from '../utils/jwttok';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import BookCard from './components/BookCard';
import Link from 'next/link';

export default function Books() {
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

        
            
            const res = await axios.get(`http://localhost:8800/books/${tokUser.id}`,{params:{id:tokUser.id}});
       
            setbooks(res.data[0]);
            setchosen(res.data[1]);

     

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
          const res = await axios.post(`http://localhost:8800/books`,{name:name});
          setbooks(res.data[0]);
          setchosen(res.data[1]);

           console.log("Data form",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      
      const sortData = async () => {
        try {
          const res = await axios.post(`http://localhost:8800/repository`,{spec:spec});
          setbooks(res.data[0]);
          setchosen(res.data[1]);

           console.log("Data",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      if (books){
        var ha = [...new Set(books.map(c=>{return (c.speciality)}))]
     
      }
   


    

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
        <img style={{alignSelf:'center'}} className='hero-image' src='./repos.jpg'/>

        <span className='font big' style={{paddingTop:10}}> С 
<span className='blue-font'>  онлайн библиотекой </span>читать книги стало еще проще!</span>
        
        


    </div>
    <div id="section" style={{display:'flex',flexDirection:'column'}}  className='repos'>
     
        {tokUser.job==1 &&     <Link  style={{color:'black', display:'flex',  alignItems:'center',gap:3}} href='/addbook'>
          <img style={{height:30}} src="./add.png"/>
        
        <p>Добавить учебник</p>
        </Link> }   

      <div style={{display:'flex',justifyContent:'space-between'}}>
        
      <div style={{display:'flex', alignItems:'center',gap:12}}>
  
             
              <button onClick={sortData} style={{background:'transparent',border:'none'}}><img style={{height:60}} src="./filter.png"/></button>

              
                <span>Дисциплина</span>
                <div  className="selecti">
      
            
                <label>
              <select  name='spec'  value={spec} onChange={event => handleSpec(event.target.value)}>
              <option id="0"  onClick={()=>setSpec('')} >Не выбрано</option>
      
              {ha ? ha.map(c=>{return(<option onClick={()=>setSpec(c)} >{c}</option>)}) 
                :null}
                 
                </select>
                </label>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
            <button className='sort'  id="asc" onClick={sortByYearAsc}>Старые-новые</button>
            <button className='sort'  id="desc" onClick={sortByYearDesc}>Новые-старые</button>
            </div>
          
            
                
               
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
  var chosenitem=chosen.filter(i=> i.bookid==book.bid)
  
  return(
            <BookCard 
            key={book.bid}
            book={book}
           tokUser={tokUser}
            chosen={chosenitem}
            setchosen={setchosen}
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
