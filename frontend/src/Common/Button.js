import React from 'react';

export function Button({ clickEvent, value }) {
    return (
        <button className="border-2 h-8 w-10 text-center border-black hover:bg-blue-400 hover:text-white" onClick={clickEvent}>
            {value}
        </button>);
}

