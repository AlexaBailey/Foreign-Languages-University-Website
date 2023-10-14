import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import setAuthToken from '../../utils/jwttok';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
export default function Navbar() {
  let tokUser;
  if (typeof window!='undefined'){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      tokUser = jwtDecode(jwt);
      console.log(tokUser)
        }
}
const router = useRouter();
const currentRoute = router.pathname;
console.log(currentRoute)
  return (
    <>
     <nav className="navbar-s" style={{display:'flex',justifyContent:'space-between', height:60, alignItems:'center'}} >
        
        <Link  className='nav-pos' href={`/`}><img className='nav-img' src='../../nav-image1.png'/>
        <span  style={{fontSize:20, color:'black'}}>EngLib</span>
        
        </Link >

        <div className='nav-pos'>
          
        <Link  className={currentRoute == "/"
       ? "actLink" 
       : "passLink"} href="/"><span>Главная</span></Link>
          <Link className={currentRoute == "/#newsline"
       ? "actLink" 
       : "passLink"}   href={"/#newsline"}><span>Новости</span></Link>  
          {tokUser ?  <><Link  className={currentRoute == "/dictionary"
       ? "actLink" 
       : "passLink"} href={'/dictionary'} target='_blank'>Онлайн-словарь</Link>
        <Link  className={currentRoute == "/chosen"
       ? "actLink" 
       : "passLink"} href={`/chosen`}>Мои учебники</Link>
        <Link  className={currentRoute == "/repository"
       ? "actLink" 
       : "passLink"} href={'/repository'}>Репозиторий</Link>
       {tokUser.job==1?<Link  className={currentRoute == "/studentworks"
       ? "actLink" 
       : "passLink"} href={'/studentworks'}>Дз</Link>:<Link  className={currentRoute == "/homework"
       ? "actLink" 
       : "passLink"} href={'/homework'}>Дз</Link>} 
        <Link  className={currentRoute == "/profile/details/[userid]"
       ? "actLink" 
       : "passLink"} href={`/profile/details/${tokUser.id}`}><img style={{height:40}}  src='../profile.png'/></Link>
                <Link href={'/logout'}><img style={{height:40}} src='../logout.png'/></Link>
</>:<>  <Link href={'/login'}>Войти</Link></>}
     


     
        
      
         
        </div>

       
         
    

        
        </nav>
        

    </>
   
  )
}
