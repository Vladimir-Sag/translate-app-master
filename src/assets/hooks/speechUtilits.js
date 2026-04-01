export default function handleSpeak(text,langCode='en'){
    window.speechSynthesis.cancel()
    if(!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voiceCodes = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES',
        'de': 'de-DE',
        'it': 'it-IT'
    };
    utterance.lang = voiceCodes[langCode]||'en-US'
    window.speechSynthesis.speak(utterance)
}