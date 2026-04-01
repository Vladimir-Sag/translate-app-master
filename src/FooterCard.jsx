import Sound from './assets/image/sound_max_fill.svg'
import Copy from './assets/image/Copy.svg'
import Alfa from "./assets/image/Sort_alfa.svg"
import useCopy from './assets/hooks/useCopy'
import handleSpeak from './assets/hooks/speechUtilits'
import { useEffect, useState } from 'react'
import PopUpCopyText from './PopUpCopyText'
const url ='https://api.mymemory.translated.net/get'

export default function FooterCard({firstCard,inputLang,outputLang,originalText,translatedText,setTranslatedText}){
    const {copied,handleCopy} = useCopy()
    const [translate,setTranslate] = useState(0)
    const [notification,setNotification] = useState(null)
    useEffect(()=>{
        if(translate===0) return;
        if(!outputLang || !originalText || !firstCard) {
            const message = !outputLang ? 'Please choose a language' : 'Please enter text'
            setNotification(message)
            setTimeout(()=>{
                setNotification(null)
            },800)
            return;
        };
        const controller = new AbortController();
        const signal = controller.signal
        async function fetchTranslate() {
            try{
                const params = new URLSearchParams({
                    q:originalText,
                    langpair:`${inputLang}|${outputLang}`
                })
                const res = await fetch(`${url}?${params.toString()}`,{signal})
                const data = await res.json()
                setTranslatedText(data.responseData.translatedText)
            }catch(error){
                if(error.name==='AbortError') return;
                console.log(error.message)
            }
        }
        fetchTranslate();
        return()=>controller.abort()
    },[translate])
    return(
        <div className='card-button-container'>
            <div className='card-two-buttons'>
                <button className='square-button' type='button' 
                    aria-label="Read text aloud"
                    onClick={()=>{
                        const textToSpeak = firstCard ? originalText : translatedText;
                        const soundtoSpeak = firstCard?inputLang:outputLang;
                        handleSpeak(textToSpeak,soundtoSpeak,)}}
                >
                    <img src={Sound} alt="Sound" />
                </button>
                <button 
                    className='square-button' type='button'
                    aria-label="Copy text to clipboard" 
                    onClick={()=>{
                    const textToSpeak = firstCard ? originalText : translatedText;
                    handleCopy(textToSpeak)}}
                >
                    <img src={Copy} alt="Copy" /></button>
                {copied&&<PopUpCopyText text={'Text copied'}/>}
                {notification&&<PopUpCopyText text={notification}/>}
            </div>
            {firstCard&&
                <button type='button' 
                    className='button-translate'
                    aria-label="Translate"
                    onClick={()=>setTranslate(prev=>prev+1)}
                ><span><img src={Alfa} alt="A" /></span><span>Translate</span></button>
            }
            
        </div>
    )
}