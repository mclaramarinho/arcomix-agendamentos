import React from "react";

function ProfilePic(props){
    return (
        <img className="row m-auto" style={{width:"30%", borderRadius: "100vw"}} src={props.src} alt="" />
    )
}

export default ProfilePic;