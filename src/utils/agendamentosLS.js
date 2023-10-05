function getAgendamentosLS(){
    return JSON.parse(localStorage.getItem("agendamentos"));
}

function setAgendamentosLS(value){
    return localStorage.setItem("agendamentos", JSON.stringify(value))
}

export {getAgendamentosLS, setAgendamentosLS}