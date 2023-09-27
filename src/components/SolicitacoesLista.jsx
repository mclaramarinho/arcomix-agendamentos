import React, { useState } from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import SocilitacaoCard from "./SolicitacaoCard";

function SolicitacoesLista(){
    const [filtro, setFiltro] = useState("");
    
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }

    return(
            <div className="row lista-container position-relative m-auto">
            <div className="col col-12 text-center mt-5">
                <h2>SOLICITAÇÕES DE AGENDAMENTO</h2>
                <hr className="w-50 m-auto" />
            </div>
            <div className="col-12 text-center">
                <Paper className="m-auto mt-5" component="form" sx={{ borderRadius:"100vh",  p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}>
                    
                    <InputBase
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
            <div className="col-12">
                <SocilitacaoCard empresa="Aurora" idAgendamento="12345678" dataAgendamento="20/09/23" horaAgendamento="16:00" tipoCarga="frios" tipoDescarga="manual" recorrencia="mensal"/>
                <SocilitacaoCard empresa="Aurora" idAgendamento="12345678" dataAgendamento="20/09/23" horaAgendamento="16:00" tipoCarga="frios" tipoDescarga="manual" recorrencia="mensal"/>
                <SocilitacaoCard empresa="Aurora" idAgendamento="12345678" dataAgendamento="20/09/23" horaAgendamento="16:00" tipoCarga="frios" tipoDescarga="manual" recorrencia="mensal"/>

            </div>
         </div>
    )
}

export default SolicitacoesLista;