import React from "react";

function TabBtn(props){
    const handleClick = () => props.handleClick;
    const isSelected = props.isSelected;

    if(isSelected){
        return(
            <div className="row button-row">
                <input value={props.label} type="button" className="btn tab-btn selected-tab-btn" onMouseUp={handleClick()} id={props.id}/>
            </div>
        )
    }else{
        return(
            <div className="row button-row">
                <input value={props.label} type="button" className="btn tab-btn unselected-tab-btn" onMouseUp={handleClick()} id={props.id}/>
            </div>
        )
    }
    
}

export default TabBtn;