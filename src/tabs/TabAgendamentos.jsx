import React, { useEffect, useState } from "react";
import TabBtn from "../components/TabBtn";
import AgendamentosLista from "../components/AgendamentosLista";
import AgendamentoDetails from '../components/AgendamentoDetails'
import { getLocalStorage, getParsedLocalStorage } from "../utils/localStorage";

function TabAgendamentos (){
    const [localAgendamentos, setLocalAgendamentos] = useState([]);
    
    //checks if there's a local storage already
    useEffect(() => {
        if(getLocalStorage("agendamentos")!==null){ //if this local storage exists
            setLocalAgendamentos(getParsedLocalStorage("agendamentos")) //agendamentos will receive the items of this storage
        }
    }, [])
    const [selected, setSelected] = useState();

    const [subTab1, setSubTab1] = useState(true);

    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        console.log(selected)
    }, [selected])

    //everytime the card inside the list container is clicked
    function handleDetails(e){
        const id = e.target.id;
        setOpenDetails(true) //allows the displaying of details
        const solicit = localAgendamentos.filter(item => { //returns all the information of the clicked card
            if(item.id_agendamento===id){
                return item;
            }
        })
        setSelected(solicit)
    }

    function tabContent(){
        if(subTab1){
            return <AgendamentosLista handleDetails={handleDetails}/>
        }else{
            return <h1>Indisponivel no momento...</h1>
        }
    }
    return(
        <div className="container-fluid tab-container">
            <div className="row">
                <div className="col-lg-2 btn-container">
                    <TabBtn isSelected={subTab1} key="solicitacao" id="solicitacao" label="LISTA" handleClick={() => !subTab1 && setSubTab1(true)} />      
                    <TabBtn isSelected={!subTab1} key="criar" id="criar" label="CALENDARIO" handleClick={() => subTab1 && setSubTab1(false)} />              
                </div>
                <div className={`col-lg-5 col`} style={{height: "100%"}}>
                    {tabContent()}
                </div>
                <div className="col-lg-5 border-box" style={{height: "100%"}}>
                    {/* if something is clicked, the info of the last card clicked will be displayed */}
                    {openDetails && (
                        <AgendamentoDetails
                            empresa={selected[0].id_fornecedor}
                            idAgendamento={selected[0].id_agendamento}
                            status={selected[0].status.toUpperCase()}
                            data={selected[0].data} 
                            hora={selected[0].hora}
                            tipoCarga={selected[0].tipo_carga}
                            tipoDescarga={selected[0].tipo_descarga}
                            recorrencia={selected[0].recorrencia}
                            observacoes={selected[0].observacoes}
                        />)
                    } 
                </div>
            </div>
        </div>
    )
}

export default TabAgendamentos;