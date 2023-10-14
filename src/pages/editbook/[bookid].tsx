import React, { createRef } from 'react'
import Navbar from '../components/Navbar';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import setAuthToken from '../../utils/jwttok';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import axios, {AxiosRequestConfig} from 'axios';

export default function EditBook() {
  const router=useRouter()
  const {bookid} = router.query
  const [mount, setmount] = useState(false);
  const [books,setBooks]=useState(undefined)
  const [chosenImage, setchosenImage] = useState<File>();
  const [writer,setWriter]= useState("")
  const [spec,setSpec]= useState("")
  const [name,setName]= useState("")
  const [comments,setComments]= useState("")
  const [date,setDate]= useState("")
  const [booklink,setbooklink]= useState("")


  let tokUser;
  useEffect(() => {
    setmount(true)
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      tokUser = jwtDecode(jwt);
      console.log(tokUser)
  }
  
  
    
  
    const getData = async () => {
      


      try {
      
      

        const requestConfig: AxiosRequestConfig = {};
        requestConfig.data = { bookid: bookid };
        
        const res = await axios.get(`http://localhost:8800/edit/${bookid}`, requestConfig);
   
        setBooks(res.data)
       
        setWriter(res.data.writers)

  
      
 
        setSpec(res.data.speciality)
      
        setName(res.data.btitle)
      
        setComments(res.data.comments)
      
    
        setDate(res.data.writedate)

    
          


        
      
      

 

        console.log(books)
       
  
         console.log("Data",res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    

  }, []); 



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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('user',tokUser.id)
 
    
    formData.append('writer',writer)
     formData.append('spec',spec)
  
    formData.append('name',name) 
   
    formData.append('comments',comments) 
   
    formData.append('date',date)
    formData.append('booklink',booklink)
    console.log(booklink)
    formData.append('publish',new Date().toLocaleDateString())
    



    axios.post(`http://localhost:8800/editbook/${bookid}`, formData)
      .then((response) => {
        console.log(response.data);
        router.push('/repository')
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
{!chosenImage &&  <img style={{height:150}}src='../upload.png'/>}
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
     
      
        <button className='send-button remove' onClick={removechosenImage}>
          Удалить файл
        </button>
      </div>
  
    )}
      

</div>
<div style={{display:'flex', flexDirection:'column'}}>
  

  <img style={{height:150}} src="../link.png"/>
  <input name="booklink" onChange={(e)=>setbooklink(e.target.value)}  className='my-input'  style={{ width:150,alignSelf:'center'}} />
</div>
      </div>
      </div>
   {books&& books!='' && 
      
  <form className='outer' onSubmit={handleSubmit} style={{display:'flex', gap:20,  flexDirection:'column', alignItems:'center'}}>
  <p>Название книги</p>
  <input defaultValue={name} name="name"   style={{width:300}} className='my-input' onChange={(e)=>setName(e.target.value)} placeholder=''/>
  <div style={{display:'flex',justifyContent:'space-between', gap:40}}>
 

    <div style={{display:'flex', flexDirection:'column', gap:6}}>
    <p>Автор</p>
    <input defaultValue={writer} name="writer" onChange={(e)=>setWriter(e.target.value)}  className='my-input' placeholder='ФИО автора'/>
    <p>Специальность</p>
    <input defaultValue={spec} className='my-input'name="spec" onChange={(e)=>setSpec(e.target.value)}  placeholder='КПО, АИСД, ... '/>

    </div>
    <div style={{display:'flex', flexDirection:'column', gap:6}}>
    <p>Дата издания</p>
    <input defaultValue={date} className='my-input'name="date" onChange={(e)=>setDate(e.target.value)}  placeholder='22.05.2023'/>
    
    
    <p>Описание</p>
    <textarea defaultValue={comments} className='my-input'name="comments" onChange={(e)=>setComments(e.target.value)}  placeholder='Комметарий к работе'/>

    </div>
    

  </div>
    <button className='start-button save'  onClick={handleSubmit}>Сохранить</button>


    
   </form>


   
    
    }

      
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

  