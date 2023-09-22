import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colaboradores from "../users/colaboradores";
import Navbar from "../components/Navbar";


function StartColab (){
    let { id } = useParams();

    const navigate = useNavigate();
    
    const profileInfo = colaboradores.filter(item => item.matricula === id)[0];

    function handleProfile (){
        return navigate(`/colaborador/${id}/perfil`)
    }

    return(
        <div>
            <Navbar handleProfile={()=>handleProfile()} />

            <h1>Welcome, {id}</h1>
        </div>
    )
}

export default StartColab;