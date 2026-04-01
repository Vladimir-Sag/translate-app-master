import { useState } from "react";

export default function useCopy(){
    const [copied,setCopied] = useState(false);
    function handleCopy(text){
        if(!text) return;
        navigator.clipboard.writeText(text.trim())
        setCopied(true);
        setTimeout(()=>{
        setCopied(null)
        },800)
    }
    return {handleCopy,copied}
}