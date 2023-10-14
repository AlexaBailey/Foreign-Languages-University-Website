
import React from 'react'

export default function Dictionary({data,  theme }) {

     
         console.log(theme)
         if (data!=undefined){

         
  return (

        
        <div className='reading'>
       
             <p className='def'>{data[0].hwi.hw}</p>
             <p className='pron'>/{data[0].hwi.prs[0].mw}/</p>
             <p>Meaning</p>
            <ul>
                <li>{data[0].shortdef[0]}</li>
                <li>{data[0].shortdef[1]}</li>
                <li>{data[0].shortdef[2]}</li>
            </ul>
            <p>Synonyms</p>
            <ul>
                <li>{data[0].shortdef[0]}</li>
                <li>{data[0].shortdef[1]}</li>
                <li>{data[0].shortdef[2]}</li>
            </ul>
            
           <a href={`https://media.merriam-webster.com/audio/prons/en/us/mp3/${data[0].hwi.hw[0]}/${data[0].hwi.prs[0].sound.audio}.mp3`}>{theme==="dark" ? <img src="https://img.icons8.com/ios-filled/50/FFFFFF/high-volume--v1.png"/>:<img src="https://img.icons8.com/ios-filled/50/1A1A1A/high-volume--v1.png"/>}</a>
           
            

          

          
        </div>

       
  
  )
         }
}


