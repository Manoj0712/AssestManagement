export function InputTag({ name, placeholder,type, id,clickEvent, onchange ,className,value,onBlurEvent}) {
    return (
        <>
            <input className={className} type={type?type:"text"} checked={value} name={name}  placeholder={placeholder} onClick={clickEvent} onChange={onchange} onBlur={onBlurEvent} value={value}/>
        </>
    );
};