import LangButton from "./LangButton"
import HorizMain from "./assets/image/Horizontal_top_left_main.svg"
export default function LanguageSelector({
    firstCard,secondCard,inputLang,
    setInputLang,outputLang,setOutputLang,
    originalText,setOriginalText,
    translatedText,setTranslatedText
}){

    const currentLang = firstCard?inputLang:outputLang

    function handleOnClick(button){
        if(firstCard){
            if(button === 'autodetect'||outputLang!==button){
                setInputLang(button)
            }
        }else if(secondCard){
            if(inputLang!==button){
                setOutputLang(button)
            }
        }
    }
    function handleSelect(e){
        const value = e.target.value
        if(firstCard && outputLang!==value){
            setInputLang(value)
        }else if(secondCard && inputLang!==value){
            setOutputLang(value)        
        }
    }
    function handleChange(){
        const currentState = originalText;
        setOriginalText(translatedText)
        setTranslatedText(currentState);
        const tempLang = inputLang;
        setInputLang(outputLang);
        setOutputLang(tempLang);

    }
    return(
        <div className='languages'>
            {firstCard&&
            <LangButton 
                buttonText={'Detect Language'} 
                isActive={currentLang==='autodetect'} 
                onClick={()=>handleOnClick('autodetect')}
            />
            }
            <LangButton 
                buttonText={'English'} 
                isActive={currentLang==='en'} 
                disabled={secondCard&&inputLang==='en'||firstCard&&outputLang==='en'}
                onClick={()=>handleOnClick('en')}
            />
            <LangButton 
                buttonText={'French'} 
                isActive={currentLang==='fr'}
                disabled={secondCard&&inputLang==='fr'||firstCard&&outputLang==='fr'}
                onClick={()=>handleOnClick('fr')}
            />
            <select name={firstCard ? "source-language" : "target-language"} 
                    id={firstCard ? "source-language" : "target-language"}
                    aria-label="Choose language to translate to" 
                    onChange={(e)=>handleSelect(e)}>
                {/* <option value="" disabled hidden>More languages</option> */}
                {
                    !(firstCard && outputLang==='es' || secondCard && inputLang==='es')&&
                    <option value="es" aria-label="Spanish language">Spanish</option>
                }
                {
                    !(firstCard && outputLang==='de' || secondCard && inputLang==='de')&&
                    <option value="de" aria-label="German language">German</option>
                }
                {
                    !(firstCard && outputLang==='it' || secondCard && inputLang==='it')&&
                    <option value="it" aria-label="Italian language">Italian</option>
                }
                
            </select>
            {secondCard&&
                <button 
                    className='square-button change-button' type='button'
                    onClick={()=>handleChange()}
                    aria-label="Swap source and target languages"
                >   
                    <img src={HorizMain} alt="change button" />
                </button>
            }
        </div>
    )
}