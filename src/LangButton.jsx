export default function LangButton({buttonText,isActive,onClick,disabled=false}){
    const classStyle = `lang-button ${isActive?'lang-button-active':''}`
    return(
        <button type="button" 
            className={classStyle}
            onClick={onClick}
            disabled={disabled}
            aria-label={buttonText}
            aria-pressed={isActive}
        >{buttonText}</button>
    )
}