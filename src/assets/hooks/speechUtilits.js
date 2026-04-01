export default function handleSpeak(text,langCode='en'){
    window.speechSynthesis.cancel()
    if(!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voiceCodes = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES',
        'de': 'de-DE',
        'it': 'it-IT'
    };
    
    utterance.lang = voiceCodes[langCode]||'en-US'
    if (voices.length > 0) {
        const targetVoice = voices.find(v => v.lang.includes(utterance.lang));
        if (targetVoice) utterance.voice = targetVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance)
}