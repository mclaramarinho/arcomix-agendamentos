import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const navigate = useNavigate();
    return (
        <i class="fa-solid fa-arrow-right-from-bracket position-absolute end-0 top-0 mt-3 me-3 back-btn btn"
            onMouseUp={()=>{
                localStorage.getItem("loginInfo") !== null && localStorage.setItem("loginInfo", JSON.stringify([]));
                sessionStorage.getItem("tempLoginInfo") !== null && sessionStorage.setItem("tempLoginInfo", JSON.stringify([]));
                navigate('/login')
            }}
        />
    )
}

export default LogoutBtn;