import React, { useEffect, useState } from "react";
import TabBtn from "./TabBtn";
import SolicitacoesLista from "./SolicitacoesLista";
import CriarForm from "./CriarForm";

function TabAgendar(props){

    const [subTab1, setSubTab1] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    
    const [colSize, setColSize] = useState();

    useEffect(() => {
        setColSize(subTab1 ? 5 : 10);
    },[subTab1])

    setInterval(( )=>{
        setWidth(window.innerWidth);
    }, [100])
    
    function tabContent(){
        if(subTab1){
            return <SolicitacoesLista />
        }else{
            document.body.style.overflowY="scroll";
            return <h1><CriarForm /></h1>
        }
    }
    return(
        <div className="container-fluid tab-container">
            <div className="row">
                <div className="col-lg-2 btn-container">
                    <TabBtn isSelected={subTab1} key="solicitacao" id="solicitacao" label="SOLICITAÇÃO" handleClick={() => !subTab1 && setSubTab1(true)} />      
                    <TabBtn isSelected={!subTab1} key="criar" id="criar" label="CRIAR" handleClick={() => subTab1 && setSubTab1(false)} />              
                </div>
                    <div className={`col-lg-${colSize} col`} style={{height: "100vh"}}>
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