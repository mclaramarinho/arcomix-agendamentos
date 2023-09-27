import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colaboradores from "../users/colaboradores";
import Navbar from "../components/Navbar";
import runAuth from "../utils/runAuth";
import MenuTabs from "../components/MenuTabs";
import TabAgendar from "../components/TabAgendar";

function StartColab (){
    
    let { id } = useParams();
    const navigate = useNavigate();

    const authInfo = JSON.parse(sessionStorage.getItem('tempLoginInfo'));

    

    const [auth, setAuth] = useState();

    let profileInfo;

    useEffect(() => {
        getAuth()
    }, []);
    
    async function getAuth () {
        let result = await runAuth(authInfo.actor, authInfo.senha, authInfo.id);
        return setAuth(result);
    }

    function handleProfile (){
        return navigate(`/colaborador/${id}/perfil`)
    }

    const [currentTab, setCurrentTab] = useState("AGENDAR");

    function handleTabs(e){
        e.preventDefault();

        const allTabs = document.getElementsByClassName("tab");
        for(let i = 0; i < 3; i++){
            allTabs[i].classList.contains("active") && allTabs[i].classList.remove("active");
        }

        e.target.classList.add("active");
        
        const tabClicked = e.target.innerText;
        return setCurrentTab(tabClicked);
    }

    if(auth){
        profileInfo = colaboradores.filter(item => item.matricula === id)[0];
        return(
            <div>
                <Navbar handleProfile={()=>handleProfile()} />
                <MenuTabs onTabClick={(e) => handleTabs(e)}/>
                { 
                    currentTab.includes("AGENDAR") ? <TabAgendar /> 
                    : currentTab.includes("AGENDAMENTOS") ? <h1>TAB DE AGENDAMENTOS</h1> 
                    : <h1>TAB DE FINALIZADOS</h1>
                }
            </div>
        )
    }else{
        return navigate('/login');
    }
    
    
}

export default StartColab;