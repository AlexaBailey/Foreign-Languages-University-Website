import React, { createRef } from 'react'
import Navbar from './components/Navbar';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import setAuthToken from '../utils/jwttok';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddHomework() {
  const [mount, setmount] = useState(false);
  const [chosenImage, setchosenImage] = useState<File>();
const [teacher,setTeacher]=useState('')
  const [name,setName]= useState("")



  let tokUser;




      const inputRef = useRef<HTMLInputElement | null>(null);
      const uploadClick = () => {
        inputRef.current?.click();
       
      };
       

   
  const changeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
     
      setchosenImage(e.target.files[0]);
      
    }
    setSelectedFile(e.target.files[0]);
  };

  const removechosenImage = () => {
    setchosenImage(null);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const router=useRouter()
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('user',tokUser.id)
    formData.append('writer',tokUser.fio)

    formData.append('name',name) 
    formData.append('teacher',teacher) 

    formData.append('publish',new Date().toLocaleDateString())
    



    axios.post('http://localhost:8800/addhomework', formData)
      .then((response) => {
        console.log(response.data);
        router.push('/homework')
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
useEffect(() => {
  setmount(true)
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          tokUser = jwtDecode(jwt);
          console.log(tokUser)
          console.log(tokUser.id)
      }
}, []);
if (mount){
  if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    setAuthToken(jwt);
    tokUser = jwtDecode(jwt);
    console.log(tokUser)
}
  
  return (
    <div>
        <Navbar/> 
      <div className='add-form'  style={{display:'flex', flexDirection:'column', alignItems:'center' }}>

  
  


    <h2  style={{textAlign:'center'}}>Загрузить новый учебный материал</h2>
        <div >

    <div style={{display:'flex',justifyContent:'space-between', gap:100}}>
    
<div>
  
<button id="b" style={{display:chosenImage&&"none", backgroundColor:'transparent', height:200, border:'none'}}  onClick={uploadClick}>
{!chosenImage &&  <img style={{height:150}}src='./upload.png'/>}
</button>
<input
type="file"
ref={inputRef}
onChange={changeImg}
style={{ display: 'none' }}
/>
    {chosenImage && (
      <div className="preview">
        <img style={{height:96}} src='./pdf.png'/>
      <p>{chosenImage.name}</p>
     
      
        <button className='start-button remove' onClick={removechosenImage}>
          Удалить файл
        </button>
      </div>
  
    )}
      

</div>

      </div>
      </div>
   

  <form className='outer' onSubmit={handleSubmit} style={{display:'flex', gap:20,  flexDirection:'column', alignItems:'center'}}>
  <p>Название дз</p>
  <input name="name"   style={{width:300}} className='my-input' onChange={(e)=>setName(e.target.value)} placeholder=''/>
  <div style={{display:'flex',justifyContent:'space-between', gap:40}}>
 

    <div style={{display:'flex', flexDirection:'column', gap:6}}>
  
    <p>Учитель</p>
    <input  name="teacher" onChange={(e)=>setTeacher(e.target.value)}  className='my-input' placeholder='ФИО учителя'/>
   
   
    </div>
    

  </div>
    <button className='start-button save'  onClick={handleSubmit}>Сохранить</button>


    
   </form>


      
   </div>


   </div>
      


   
    
  )


}
else{
  return null
}
}
{/*
<div style={{display:'flex', justifyContent:'space-around'}}>
<div className='container'>
{!chosenImage &&  <div>Загрузить новый файл:</div>}



<button id="b" style={{display:chosenImage&&"none"}}  onClick={uploadClick}>
{!chosenImage &&  <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/null/external-Upload-File-seo-smashingstocks-flat-smashing-stocks.png"/>}
</button>
<input
type="file"
ref={inputRef}
onChange={changeImg}
style={{ display: 'none' }}
/>
    {chosenImage && (
      <div className="preview">
        <h2>Детали файла</h2>
      <p>Название файла: {chosenImage.name}</p>
      <p>Тип файла: {chosenImage.type}</p>
      <p>Размер в байтах: {chosenImage.size}</p>
      
        <button className='remove-button' onClick={removechosenImage}>
          Удалить файл
        </button>
      </div>
  
    )}

  </div>
  <div>

  



  </div>
  
 
  
</div>*/}

  