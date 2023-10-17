import React from "react";

function ProfilePic(props){
    return (
        <img className="row m-auto" style={{width:"10vh", height:'10vh', borderRadius: "500vw"}} src={props.src} alt="" />
    )
}

export default ProfilePic;