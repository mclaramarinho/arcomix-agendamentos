import React, { useEffect, useState } from "react";
import TabBtn from "../components/TabBtn";
import SolicitacoesLista from "../components/SolicitacoesLista";
import CriarForm from "../components/CriarForm";
import { getTempLoginInfo } from "../utils/tempLoginInfo";
import { getLoginInfoLS } from "../utils/loginInfoLS";

function TabAgendar(){

    const [subTab1, setSubTab1] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    
    const [colSize, setColSize] = useState();
    const authInfo = getTempLoginInfo();

    useEffect(() => {
        authInfo.actor === "Fornecedor" &&  setSubTab1(false)
    }, [])
    useEffect(() => {
        authInfo.actor === "Colaborador" ? setColSize(subTab1 ? 5 : 10) : setColSize(12);
    },[subTab1])

    setInterval(()=>{
        setWidth(window.innerWidth);
    }, [100])
    
    function tabContent(){
        if(authInfo.actor === "Colaborador"){
            if(subTab1){
                return <SolicitacoesLista />
            }else{
                return <CriarForm formType="agend" />
            }
        }else{
            return <CriarForm formType="solic" />
        }
        
    }
    return(
        <div className="container-fluid tab-container">
            <div className="row">
                {authInfo.actor === "Colaborador" && 
                    <div className="col-lg-2 btn-container">
                            <TabBtn isSelected={subTab1} key="solicitacao" id="solicitacao" label="SOLICITAÇÕES" handleClick={() => !subTab1 && setSubTab1(true)} />
                            <TabBtn isSelected={!subTab1} key="criar" id="criar" label="CRIAR" handleClick={() => subTab1 && setSubTab1(false)} />
                    </div>
                }
                <div className={`col-lg-${colSize} col`} style={{height: "100%"}}>
                    {tabContent()}
                </div>
                
                {width > 992 && subTab1 && (
                    <div className="col-lg-5">
                       
                    </div>
                )}
                
            </div>
        </div>
    )
}
export default TabAgendar;