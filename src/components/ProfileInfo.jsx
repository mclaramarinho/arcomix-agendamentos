import React from "react";

function ProfileInfo(props){
    return(
        <div className="row m-auto w-75">
            <h3 className="row m-auto mt-5" style={{width:"fit-content", fontWeight: 700, fontFamily:"Martel Sans", color: "#343232"}}>
                {props.label}
            </h3>
            <input type="text" readOnly
                    className="form-control text-center py-2 pt-3"
                    value={props.value}
                    style={{borderRadius:"100vw", fontSize:"12px", color: "#A09F9F", fontWeight:700, fontFamily:"Martel Sans"}}
            />
        </div>
    )
}

export default ProfileInfo;