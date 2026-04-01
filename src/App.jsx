import Card from './Card'
import { useState } from 'react';
function App() {
  const paddingOne=[23,21];
  const paddingTwo=[24,22]
  const [inputLang,setInputLang] = useState('autodetect')
  const [outputLang,setOutputLang] = useState(null)
  const [originalText,setOriginalText] = useState('Hello, how are you?')
  const [translatedText,setTranslatedText] = useState('')
  return (
    <>
      <header>
        <figure className='header-logo'>
          <img src="/logo.svg" alt="translated.io" fetchPriority='high' loading='eager' width={137} height={45}/>
        </figure>
      </header>
      <main>
        <Card 
          padding={paddingOne} firstCard={true} className='first-card' 
          inputLang={inputLang} setInputLang={setInputLang}
          outputLang={outputLang} setOutputLang={setOutputLang}
          originalText={originalText} setOriginalText={setOriginalText}
          translatedText={translatedText} setTranslatedText ={setTranslatedText}
        />
        <Card 
          padding={paddingTwo} secondCard={true} className='second-card'
          inputLang={inputLang} setInputLang={setInputLang}
          outputLang={outputLang} setOutputLang={setOutputLang}
          originalText={originalText} setOriginalText={setOriginalText}
          translatedText={translatedText} setTranslatedText ={setTranslatedText}
        />
      </main>
    </>
  )
}

export default App
