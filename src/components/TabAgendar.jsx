import React, { useState } from "react";
import TabBtn from "./TabBtn";
import SolicitacoesLista from "./SolicitacoesLista";
function TabAgendar(){
    const [subTab1, setSubTab1] = useState(true);
    function tabContent(){
        if(subTab1){
            return <SolicitacoesLista />
        }else{
            return <h1>subTab2</h1>
        }
    }
    return(
        <div className="container-fluid tab-container">
            <div className="row">
                <div className="col-lg-2 btn-container">
                    <TabBtn isSelected={subTab1} key="solicitacao" id="solicitacao" label="SOLICITAÇÃO" handleClick={() => !subTab1 && setSubTab1(true)} />      
                    <TabBtn isSelected={!subTab1} key="criar" id="criar" label="CRIAR" handleClick={() => subTab1 && setSubTab1(false)} />              
                </div>
                <div className="col-lg-5 list-container">
                    {tabContent()}
                </div>
                <div className="col-lg-5">
                    detais detais details
                </div>
            </div>
        </div>
    )
}

export default TabAgendar;