import React, { useEffect, useState } from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import AgendamentoCard from "./AgendamentoCard";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAgendamentosLS } from "../utils/agendamentosLS";
import dayjs from "dayjs";
function AgendamentosLista(props){
    //controls the value of what's typed in the filter field
    const [filtro, setFiltro] = useState("");
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }
    //array to store all the appointments
    const [agendamentos, setAgendamentos]=  useState([]);
    
    //array to store only the confirmed agendamentos
    const [localAgendamentos, setLocalAgendamentos] = useState([]);
  

    //runs everytime the page is loaded
    useEffect(() => {
        if(getAgendamentosLS()!==null){ //if this local storage exists
            setAgendamentos(getAgendamentosLS()) //agendamentos will receive the items of this storage
        }
    }, [])
    //every time agendamentos changes
    useEffect(()=>{
        let agend;
        if( agendamentos !== undefined && agendamentos !== null && agendamentos.length > 0 ){
            agend = agendamentos.map(item => {
                if(item.status !== "pendente" && item.status !== "recusado" && item.status !== "finalizado" && item !== undefined && item.status !== "cancelado"){
                    return item;
                }
            }) 
            setLocalAgendamentos(() => {
                return [agend.map(item=>{
                    if(item !== undefined){
                        return item
                    }
                })]
            }) 
            
        }
    }, [agendamentos]) 
    
    function showLista(localAgendamentos){ 
        if(localAgendamentos.length === 0 ){
            return (
            <div className="row text-center mt-5 m-auto gutter-x-0">
                <h2 className="bold">Não há agendamentos no momento.</h2>
                <i class="fa-solid fa-inbox" style={{fontSize: "15vh", marginBottom: "5vh", color: "#A09F9F"}}></i>
            </div>
            )
        }else{
            return localAgendamentos.map((item) => {
                return item.map(subitem => {
                    return subitem!==undefined && (
                        <AgendamentoCard 
                            empresa={subitem.id_fornecedor}
                            idAgendamento={subitem.id_agendamento}
                            dataAgendamento={dayjs(subitem.data).format('DD/MM/YYYY')}
                            horaAgendamento={dayjs(subitem.data).format('HH:mm')}
                            tipoCarga={subitem.tipo_carga}
                            tipoDescarga={subitem.tipo_descarga}
                            recorrencia={subitem.recorrencia}
                            handleCardClick={props.handleDetails}
                        />
                    )
                })
                
            })
        }
    }
    const periodo = ['Todos', 'Hoje', 'Essa Semana', 'Esse Mês']
    return(
        
        <div className='container  agendamentos-container  overflow-y-scroll position-relative m-auto hide-scrollbar mt-5 large-container-shadow' >
            <div className="row h-25  text-center mt-5 mb-5">
                <h2 className="bolder">TODOS OS AGENDAMENTOS</h2>
                <hr className="w-50 m-auto" />
            </div>
            <div className="row h-25 text-center mb-5">
                <Paper className="m-auto" component="form" sx={{ borderRadius:"100vh",  p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}>
                    
                    <InputBase
                        className="color-black font-12"
                        sx={{ ml: 1, flex: 1}}
                        placeholder="Nome da empresa..."
                        value={filtro}
                        onChange={(e) => handleFiltro(e)}
                    />
                    <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>       
                    
                </Paper>
            </div>
            <div className="row h-25 mb-5 w-75 m-auto">
                <div className="col-8">
                    <Box sx={{ padding: 'none', width: `100%`, margin: '0 auto'}}>
                        <FormControl fullWidth variant="standard">
                            <Select
                            id="demo-simple-select"
                            // value={age}
                            // label="Age"
                            renderValue={(selected) => {
                                if (selected === undefined || selected.length === 0) {
                                  return <em className="color-faded-black font-12">Filtrar por período</em>;
                                }
                                return selected;
                              }}
                              className="font-12"
                            displayEmpty
                            // onChange={handleChange}
                            >
                            {periodo.map((item, index) => {
                                return <MenuItem className="color-black font-12" value={item}>{item}</MenuItem>
                            })}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="col-4"><button className="btn font-14 bold"><i class="fa-solid fa-print"/> Relatório</button></div>

            </div>

            <div className="row h-25 mt-5 solicitacoes-container">
                {showLista(localAgendamentos)}
                
            </div>
         </div>
    )
}

export default AgendamentosLista;