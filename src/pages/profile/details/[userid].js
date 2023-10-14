import Head from 'next/head'
import axios from 'axios'
import { useEffect,useState} from 'react';
import React from 'react'
import setAuthToken from '../../../utils/jwttok';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';



export default function Profile() {
    let tokUser;
    const [details,setDet]=useState('')
    const [mount,setmount]=useState(false)
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
           
            
            const res = await axios.get(`http://localhost:8800/profile/details/${tokUser.id}`,{params:{id:tokUser.id}});
            setDet(res.data);
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getData();
    

      }, []); 
      if (mount){
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          tokUser = jwtDecode(jwt);
          console.log(tokUser)
      }
   
    return (
    
        <div className='profile-body'>
            <div className='profile-box'>
                <div className='profile-left'>

                    <img src='../../student.png'/>
                    <Link href={`/profile/${tokUser.id}`}><img src='../../edprof.png'/></Link>

                </div>
                {details&&details.map((detail)=>{return(

                    <>
                     <div className='profile-right'>
                        <div style={{display:'flex', flexDirection:'column'}}>
               
                        <div style={{display:'flex',flexDirection:'column',margin:20}}>
                        <span className='p-f'>Имя пользователя</span>
                <span>{detail.username}</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',margin:20}}>
                <span className='p-f'>E-mail</span>
                <span>{detail.email}</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',margin:20}}>
               <span className='p-f'>Био</span>
                <span>{detail.bio}</span>
                <Link href={`/`}><img  style={{height:40, marginTop:20}} src='../../home.png'/></Link>


               </div>
               
               </div>
               

                     <div>

                        <div style={{display:'flex',flexDirection:'column',margin:20}}>
                        <span className='p-f'>Фамилия Имя</span>
                <span>{detail.fio}</span>

                        </div>
                        <div style={{display:'flex',flexDirection:'column',margin:20}}>
                <span className='p-f'>Должность </span>
                <span>{detail.job==0 ? "студент":"преподаватель"}</span>
                </div>
              
         

                    </div>
                    
            
               </div>
            
             
                    
                    
                    </>
                )})}
            
                           </div>
        </div>
    
      
    
  )
}
else{
    return null
}
}