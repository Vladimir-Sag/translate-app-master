import LanguageSelector from './LanguageSelector'
import FooterCard from './FooterCard'
import { useRef, useState,useEffect } from 'react';
export default function Card({
  padding,firstCard=null,secondCard=null,
  className,inputLang,setInputLang,
  outputLang,setOutputLang,
  originalText=null,setOriginalText=null,
  translatedText=null,setTranslatedText=null
}) {
    const cardStyle ={
        paddingBlock:`${padding[0]}px`,
        paddingInline:`${padding[1]}px`,
    }
    const textAreaSize = 500;
    const [localText,setLocalText] = useState(firstCard ? originalText : "")
    const timerRef = useRef();
    useEffect(() => {
        if (firstCard) setLocalText(originalText);
    }, [originalText]);

    function handleOnChange(e){
      const value = e.target.value;
      setLocalText(value)
      if(timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(()=>{
        setOriginalText(value)
      },500)
    }

    const currentText = firstCard?localText:translatedText
    return(
        <div className={`card ${className}`} style={cardStyle}>
          <LanguageSelector 
            firstCard={firstCard} secondCard={secondCard} 
            setInputLang={setInputLang} setOutputLang={setOutputLang} 
            inputLang={inputLang} outputLang={outputLang}
            originalText={originalText} setOriginalText={setOriginalText}
            translatedText={translatedText} setTranslatedText={setTranslatedText}
          />
          <div className='line'></div>
          <div className='textarea-container'>
            <label 
              htmlFor={firstCard ? "source-text" : "target-text"} 
              className="visually-hidden"
            >
              {firstCard ? "Source text for translation" : "Translated text"}
            </label>
            <textarea 
              name={firstCard ? "source-text" : "target-text"}
              id={firstCard ? "source-text" : "target-text"} className='card-textarea' 
              value={currentText} maxLength={textAreaSize}
              readOnly={secondCard}
              onChange={(e)=>handleOnChange(e)}
            >
            </textarea>
            {firstCard&&
                <p className='card-count-symbol'>{localText.length}/{textAreaSize}</p>
            }
          </div>
          <FooterCard 
            firstCard={firstCard} inputLang={inputLang} 
            outputLang={outputLang} originalText={originalText}
            translatedText={translatedText}
            setTranslatedText={setTranslatedText}
          />
        </div>
        
    )
}