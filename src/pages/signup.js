import React from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
export default function Login() {
	
	const [error,setError] = useState(false)
  const [job,setJob]=useState('')
  const jobs = ["студент", "преподаватель"]

	const router = useRouter()
	axios.defaults.withCredentials =true
	const send=()=>{
		formik.handleSubmit
		
	}
	
  
	const formik = useFormik({
  
        initialValues: {
    
          email: "",
          password: "",
            fi: "",
            username: "",
            job:''
          
    
        },
    
        onSubmit: async (values)=> {
    
          try {
            var res=await axios.post("http://localhost:8800/signup", values);
            console.log("res",res.data)
            router.push('/login')
           
       
          } catch (err) {
      
            setError(true)
    
        }
      },
      validate:values=>{
        let errors = {};
        const regex1 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
        const regex3 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,^.]).{8,32}$/i;
        if (!values.email) {
          errors.email = "Поле не может быть пустым";
        } else if (!regex1.test(values.email)) {
          errors.email = "Неверный формат";
        }
        if (!values.username) {
          errors.username = "Поле не может быть пустым";
          } else if (values.username.length < 4) {
          errors.username = "Имя должно быть не менее 4 символов";
          }
          else if (!regex2.test(values.username)){
          errors.username = "Исключите символы, в начале буквы"
          }
          if (!values.password) {
          errors.password = "Поле не может быть пустым";
          } else if (values.password.length < 7) {
          errors.password = "Имя должно быть не менее 7 символов";
          }
          else if (!regex3.test(values.password)){
          errors.password = "Неверный формат";
        
          }
        return errors;
      }
    
      
      })
  
  
  return (
    <div className='login'>

			
	<div className='login-b' style={{alignSelf:'center',display:'flex',flexDirection:'column', width:580,backgroundColor:'white',  }}>
        <img src='./header.jpg'/>
        <form style={{display:'flex',flexDirection:'column', gap:10}} onSubmit={formik.handleSubmit}>
            <h2>Создать личный кабинет</h2>
            <span>Имя пользователя</span>
            <input className='my-input' name='username' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.username} placeholder="nikita1737"/> 
              {formik.errors.username ? <p className="error" >
             {formik.errors.username}
           </p> :null}         
             
             <span>Фамилия Имя</span>
<input name='fi'  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.fi} placeholder="Петров Петр Иванович"/>
              <span>Должность</span>
        <div  className="selecti">


<label>
        <select name='job'  value={job} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setJob('')} >Не выбрано</option>

        {jobs.map(c=>{return(<option onClick={()=>setJob(c)} >{c}</option>)}) 
}
           
          </select>
          </label>
          </div>
        
	
    <span>E-mail</span>

			<input name='email' type="email"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.email} placeholder="niksok@gmail.com"/>
				 {formik.errors.email ? <p className="error" >
             {formik.errors.email}
           </p> :null}
		  
               <span>Пароль</span>
<input  className='my-input' name='password' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.password} placeholder="Nikita15$"/>  
              {formik.errors.password ? <p className="error" >
             {formik.errors.password}
           </p> :null}   
                    <button style={{marginTop:20}} className='start-button save' onSubmit={formik.handleSubmit}>Отправить</button>
    <Link href={'/login'}><small>Уже имеете аккаунт? Войти</small></Link>
        </form>
	
</div>

  

    </div>
  )
}
