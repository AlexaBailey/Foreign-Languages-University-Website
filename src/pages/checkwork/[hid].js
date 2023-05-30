import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router';

export default function CheckWork() {
    const [mark,setMark]=useState('')
    const [credit,setCredit]=useState('')
    const router=useRouter()
    const hid= router.query.hid
    const addMark= async (e) => {
        try {
          e.preventDefault()
          console.log("form")
          const res = await axios.post(`http://localhost:8800/check/${hid}`,{params:{hid:hid},mark:mark,credit:credit});
          router.push('/studentworks')
           console.log("Data form",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      
  return (
    <>
    <Navbar/>
      <div className='mark-form'>
      <div className='add-form'>
       <h2> Добавить оценку</h2>
        <form onSubmit={addMark} style={{display:'flex',flexDirection:'column', gap:6}}>
        <h3>Оценка</h3>
        <input name='mark' className='my-input' onChange={(e)=>setMark(e.target.value)} placeholder='1,2...10'/>
        <h3>Зачтено</h3>
        <input name='credit' className='my-input' onChange={(e)=>setCredit(e.target.value)} placeholder='+/-' />
      
        <button type="submit" onClick={addMark} style={{marginTop:20}} className='start-button save'>Отправить</button>
        </form>
      
    </div>
    </div>
    </>
  
    
  )
}
