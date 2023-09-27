import { updateAgendamentos } from "./agendamentos";

let solicitacoes = [
    {
        idSolicitacao: "",
        id_fornecedor: "",
        status: "",
        data: "",
        hora: "",
        tipo_carga: "",
        tipo_descarga: "",
        recorrencia: "",
        observacoes:""
    }
];

function getSolicitacoes(){
    return solicitacoes;
}
function updateSolicitacoes (action, object){
    if(action === "delete"){ //quando solicitacao for aceita
        return solicitacoes.map((item, index) => {
            return item.idSolicitacao===object && solicitacoes.splice(index, 1);
        })
    }else if(action === "reject"){ //quando solicitacao for rejeitada
        return solicitacoes.map((item) => {
            return item.idSolicitacao === object && (item.status="Recusada")
        })
    }else if(action === "accept"){ //quando solicitacao for aceita
        const solAceita = solicitacoes.filter(item => item.idSolicitacao === object)
        updateAgendamentos("create", solAceita);
        const newSolicitacoes = solicitacoes.filter((item, index) => {
            return (item.idSolicitacao!==object)
        })
        return solicitacoes = newSolicitacoes;
        
    }else if(action === "create"){
        return solicitacoes.push({
            idSolicitacao: object.idSolicitacao,
            id_fornecedor: object.id_fornecedor,
            status: object.status,
            data: object.data,
            hora: object.hora,
            tipo_carga: object.tipo_carga,
            tipo_descarga: object.tipo_descarga,
            recorrencia: object.recorrencia,
            observacoes: object.observacoes
        })
    }
}

export {getSolicitacoes, updateSolicitacoes, solicitacoes};