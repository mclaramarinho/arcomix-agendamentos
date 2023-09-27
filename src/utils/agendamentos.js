let agendamentos = [{
        idAgendamento: "",
        id_fornecedor: "",
        status: "",
        data: "",
        hora: "",
        tipo_carga: "",
        tipo_descarga: "",
        recorrencia: "",
        observacoes:"",
        isEntregue: false
}]

function getAgendamentos(){
    return agendamentos;
}

function updateAgendamentos(action, object){
    if(action === "create"){ //adicionar agendamento diretamente ou atraves de uma solicitacao aceita
        return agendamentos.push({
            idAgendamento: object.idAgendamento,
            id_fornecedor: object.id_fornecedor,
            status: object.status,
            data: object.data,
            hora: object.hora,
            tipo_carga: object.tipo_carga,
            tipo_descarga: object.tipo_descarga,
            recorrencia: object.recorrencia,
            observacoes: object.observacoes,
            isEntregue: object.isEntregue
        })
    }else if(action === "delete"){ //remover um agendamento
        return agendamentos.map((item, index) => {
            return item.idAgendamento === object && agendamentos.splice(index, 1);
        })
    }else if(action === "update"){ //atualizar um agendamento
        return agendamentos.map((item) => {
            return item.idAgendamento === object.idAgendamento && (
                item.idAgendamento= object.idAgendamento,
                item.id_fornecedor= object.id_fornecedor,
                item.status= object.status,
                item.data= object.data,
                item.hora= object.hora,
                item.tipo_carga= object.tipo_carga,
                item.tipo_descarga= object.tipo_descarga,
                item.recorrencia= object.recorrencia,
                item.observacoes= object.observacoes,
                item.isEntregue= object.isEntregue 
            )
        })
    }
}

export{getAgendamentos, updateAgendamentos}