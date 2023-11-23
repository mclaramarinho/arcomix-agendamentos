import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import runAuth from "../utils/runAuth";
import MenuTabs from "../components/MenuTabs";
import TabAgendar from "../tabs/TabAgendar";
import TabAgendamentos from "../tabs/TabAgendamentos";
import { getTempLoginInfo, setTempLoginInfo } from "../utils/tempLoginInfo";
import TabFinalizados from "../tabs/TabFinalizados";
import { getLoginInfoLS } from "../utils/loginInfoLS";

function Start (){
    
    let { id } = useParams(); //gets the id of the user from the URL

    const navigate = useNavigate();

    const authInfo = getTempLoginInfo() || getLoginInfoLS(); //gets the login info saved for the current session

    const [auth, setAuth] = useState();


    useEffect(() => {
        runAuth(authInfo.actor, authInfo.senha, authInfo.id).then((value) => setAuth(value)) //checks if user is authorized
        if(getTempLoginInfo() === undefined || getTempLoginInfo() === null){
            setTempLoginInfo(authInfo.id, authInfo.senha, authInfo.actor)
        }
    }, []);

    function handleProfile (){ //after click on the nav button
        return navigate(`/colaborador/${id}/perfil`)
    }

    const [currentTab, setCurrentTab] = useState("AGENDAR"); //indicates the tab to display

    function handleTabs(e){ //sets the current tab according to the choice of the user
        e.preventDefault();

        const allTabs = document.getElementsByClassName("tab");
        for(let i = 0; i < 3; i++){
            allTabs[i].classList.contains("active") && allTabs[i].classList.remove("active");
        }

        e.target.classList.add("active");
        
        const tabClicked = e.target.innerText;
        return setCurrentTab(tabClicked);
    }

    if(auth){ //authorized
        return(
            <div>
                <Navbar handleProfile={()=>handleProfile()} />
                <MenuTabs onTabClick={(e) => handleTabs(e)}/>
                { //check which tab to display
                    currentTab.includes("AGENDAR") ? <TabAgendar /> 
                    : currentTab.includes("AGENDAMENTOS") ? <TabAgendamentos /> 
                    : currentTab.includes("FINALIZADOS") ? <TabFinalizados />
                    : navigate(`/colaborador/${id}/relatorio-geral`)
                }
            </div>
        )
    }else{ //unauthourized
        return navigate('/login');
    }
    
    
}

export default Start;