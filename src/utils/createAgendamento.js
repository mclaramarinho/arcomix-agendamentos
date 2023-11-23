import fornecedores from "../users/fornecedores";
import { getAgendamentosLS } from "./agendamentosLS";

let agendamentos = (getAgendamentosLS() !== undefined) && getAgendamentosLS()

const idExistentes = (agendamentos !== undefined && agendamentos !== null && agendamentos.length > 1) ? agendamentos.map(item => item.id_agendamento) : 0

function generateId(){
    let existe;
    let newId = Math.floor(Math.random()*100000000);

    do{
        newId = Math.floor(Math.random()*100000000).toString();

        for(let i = 0; i < idExistentes.length; i++){
            if(idExistentes[i] === newId){
                existe=true;
            }
        }
    }while(existe)

    return newId;
}
function createAgendamento(idAgendamento, idFornecedor, status, data, tipoCarga, tipoDescarga, recorrencia, observacoes, isEntregue, isColaborador){
    let nomeFantasia;
    if(isColaborador===true){
        nomeFantasia = fornecedores.filter(item =>{
            if(item.informacoesLegais[0] === idFornecedor){
                return item.informacoesLegais[1];
            }
        })
        nomeFantasia = (nomeFantasia[0].informacoesLegais[1])
    }else{
        nomeFantasia = idFornecedor[0];
    }
    
    return {
        id_agendamento: idAgendamento,
        id_fornecedor: nomeFantasia,
        status: status,
        data: data,
        tipo_carga: tipoCarga,
        tipo_descarga: tipoDescarga,
        recorrencia: recorrencia,
        observacoes:observacoes,
        isEntregue: isEntregue
    }
}

export {generateId, createAgendamento};