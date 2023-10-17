import React from "react";

function ActionBtn(props){
    const value = props.value || "";
    const label = props.label;
    const id = props.id || "";
    const handler = props.handler;
    const bg = props.bg;
    const bgClass = bg==="red" ? "red-bg" : bg==="green" ? "green-bg" : bg==='gray' ? 'gray-bg' : "dark-blue-bg";
    let classes = props.classes || `btn col-5 solic-btn agend-btn pt-2 font-14 bold ${bgClass} m-auto ${props.addClass}`;
    const sx = props.sx;
    return (
        <button 
            style={sx}
            value={value}
            id={id} 
            onMouseUp={(e) => handler(e)} 
            className={classes}
        >
            {label}
        </button>)
}

export default ActionBtn;