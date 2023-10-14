import { createContext, useState } from 'react'
import axios from 'axios'
import Dictionary from './Dict'
import { useEffect } from 'react'
import {BsSearch} from 'react-icons/bs'
import setAuthToken from '../utils/jwttok'
import Navbar from './components/Navbar'
import ReactSwitch from 'react-switch'
import { useRouter } from 'next/router'
export const ThemeContext = createContext(null);

export default function DictionaryPage() {

    const [mount, setmount] = useState(false);
const router= useRouter()

let tokUser;
 
 const [data,setData]=useState({})
 const[state,changeState]=useState(true)
 const fonts = ['Serif','Sans-serif','Monospace']
  const [font,setFont] = useState('')
const [music,setMusic]=useState('')

  const handleCategoryChange = (font) => {
     setFont(font);
 }

  const [loading,setloading]=useState(false)
  const [word,setWord]=useState('')
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=46ecf3b7-69bc-4c83-8790-d9afd563c5ac`
  
  function fetchWord(e){
    e.preventDefault()
    axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
      console.log(`index ${response.data[0].hwi.prs[0].sound.audio}`)
      })
      setWord('')
      
      
    }
    function changeTheme(){
      changeState(current=>!current)
    }
  
    
    function fetchMusic(){
   
      axios.get(url).then((response)=>{
        setMusic(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${response.data[0].hwi.prs[0].sound.audio}.mp3`)
        })
        
      }
      const [theme, setTheme] = useState("dark");

      const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
      };
      

   
       
      
  return (
    <>
  
  
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
      
        <section className={font} id={theme} >
    <h2 style={{margin:0,textAlign:'center',paddingTop:40}}>Онлайн-словарь Englib </h2>
        <div>
          <nav className='navbar'>
            {theme==="light" ? <img className="book" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2aMUoDQRSGXyGIqKBgIXiC3CCEwMD7J7B5vxgQcgxtLDyDd/IAESzSWVgI8QhqY6Ps6mIlyG5mNyPvgyl3mY/5doqdEXEyoyiKbQMuCCyo+krgo88hTaDqiQHLvifPNiLfK1FJmOqDAbOz0WhfeoJNRQy4rCVmIRxIz7CFyF0lAsxkA2ALkZfywT5zWotIq10iFxEDCgLPKXYlU12V7+9GRHWVcos11VUnIimz4y/vdhH6imSUlv2Xj92AIpWMdbn99gFdBL4iSaCnBU8rCfS04GklgZ4WPK0k0NOCp5UEelrwtJJATwtfac1D2KPqNYF7U31L+feEfxiNl5LAU9+T55pEyrGYqk5PQziS3ODPf6bbEMKW5AprkRgHkjME3kuR8nRXcsaAx0okxqHkjAE3VVrAcj4c7kiucDw+rM8JqwsDMZ5bCMeSIxbjoE5sU4Y0ZTKZ7FL1qrpAkOulGke65xPgenqrtKLfwQAAAABJRU5ErkJggg=="/> : <img className='book' src="https://img.icons8.com/ios/50/FFFFFF/book--v1.png"/>}
         <div className='selecti'>
         <select name="font"  value={font} onChange={event => handleCategoryChange(event.target.value)}>
              <option id="0"  onClick={()=>setFont(fonts[0])} >{fonts[0]}</option>
              <option id="1" onClick={()=>setFont(fonts[1])}>{fonts[1]}</option>
              <option id="2" onClick={()=>setFont(fonts[2])}>{fonts[2]}</option>
          </select>

         </div>
          
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          <button className='toggle' onClick={toggleTheme}>{ theme=="light"?<img src="https://img.icons8.com/ios-glyphs/30/000000/bright-moon--v2.png"/>:<img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sun--v1.png"/>}</button>
          
          </nav>
          <div className='outer'>
          <form className="searchform" onSubmit={fetchWord}>
          <input className='search' onChange={(e)=>setWord(e.target.value)} placeholder='Search word'/>
          <button className="bs" onClick={fetchWord}><img style={{height:30}} src='./search.png'/></button>
          </form>
          </div>
          {/*<button onClick={()=>fetchMusic()}>Fetch</button>*/}
        
          {data[0]  && theme ? <div><Dictionary data={data} theme={theme}/></div>:''}
      
          </div>
       

        

      </section>

     

        
    
      
      </ThemeContext.Provider>
    
    </>
  )
}

