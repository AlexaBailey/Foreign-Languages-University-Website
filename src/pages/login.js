import React from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
export default function Login() {
	
	const [error,setError] = useState(false)

	const router = useRouter()
	axios.defaults.withCredentials =true
	const send=()=>{
		formik.handleSubmit
		
	}
	const formik = useFormik({
  
	  initialValues: {
  
		name: '',
  
		password: '',
  
	  },
  
	  onSubmit: async (values)=> {
  
		try {
		  const {data} = await axios.post("http://localhost:8800/login", values)
		  localStorage.setItem("token", data);
		
		
		  router.push('/')
		  
		 
	 
		} catch (err) {
	
		  setError(true)
  
	  }
	},
	validate:values=>{
	  let errors = {};
	  const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
	  const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i;
	  if (!values.name) {
		errors.name = "Поле не может быть пустым";
	  } else if (values.name.length < 4) {
		errors.name = "Имя должно быть не менее 4 символов";
	  }
	  else if (!regex2.test(values.name)){
		errors.name = "Исключите символы, в начале буквы"
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
            <h2>Войти в личный кабинет</h2>
            <span>Имя пользователя</span>
            <input className='my-input' name='name' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.name} placeholder="nikita1234"/>  
			  {formik.errors.name ? <p className="error" >
             {formik.errors.name}
           </p> :null}           
             
               <span>Пароль</span>
<input  className='my-input' name='password' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.password} placeholder="Nikita15$&"/>   
			  {formik.errors.password ? <p className="error" >
             {formik.errors.password}
           </p> :null}     
                    <button style={{marginTop:20}} className='start-button save' onSubmit={send}>Отправить</button>
    <Link href={'/signup'}><small>Не имеете аккаунта? Зарегистрироваться</small></Link>
        </form>
	
</div>

  

    </div>
  )
}
