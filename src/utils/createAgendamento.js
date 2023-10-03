import fornecedores from "../users/fornecedores";

const agendamentos = localStorage.getItem("agendamentos") !== undefined && JSON.parse(localStorage.getItem("agendamentos"))
const idExistentes = agendamentos !== undefined && agendamentos !== null ? agendamentos.map(item => item.id_agendamento) : 0

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
function createAgendamento(idAgendamento, idFornecedor, status, data, hora, tipoCarga, tipoDescarga, recorrencia, observacoes, isEntregue){
    let nomeFantasia = fornecedores.filter(item =>{
        if(item.informacoesLegais[0] === idFornecedor){
            return item.informacoesLegais[1];
        }
    })
    nomeFantasia = (nomeFantasia[0].informacoesLegais[1])
    return {
        id_agendamento: idAgendamento,
        id_fornecedor: nomeFantasia,
        status: status,
        data: data,
        hora: hora,
        tipo_carga: tipoCarga,
        tipo_descarga: tipoDescarga,
        recorrencia: recorrencia,
        observacoes:observacoes,
        isEntregue: isEntregue
    }
}

export {generateId, createAgendamento};