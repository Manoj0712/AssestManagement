import React from "react";
import { InputTag } from './InputTag.js'
export default function InputBoxWithName({ headerName, name,symbol,type,placeholder, id, clickEvent, onchange, className,value,onBlurEvent}) {
    
    return (
        <div className="flex">
            <div className="text-left w-40">
                <h1 className="text-xl">{headerName}</h1>
            </div>
            <div className="w-56">
               {symbol} <InputTag name={name} type={type} placeholder={placeholder} id={id} className={className} clickEvent={clickEvent} onchange={onchange} onBlurEvent={onBlurEvent} value={value}/>
            </div>
        </div>
    )
}