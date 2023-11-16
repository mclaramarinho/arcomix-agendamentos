import dayjs from "dayjs";

function getAgendamentosLS(){
    const LS = JSON.parse(localStorage.getItem("agendamentos"));
    if(LS === null || LS === undefined){
        setAgendamentosLS([]);
        return LS;
    }else{
        return LS;
    }
}

function setAgendamentosLS(value){
    return localStorage.setItem("agendamentos", JSON.stringify(value))
}

function updateAgendamentosLS(){
    const prev = getAgendamentosLS();
    const today = dayjs();
    if(prev !== null && prev !== undefined && prev.length > 0){
        const updated = prev.map(item => {

            const date = dayjs(item.data);
            if(item.isEntregue===true && item.status === "agendado"){
                item.status = "finalizado"
            }else if(item.status !== "finalizado" && item.status !== "cancelado"){
                if(date.year() < today.year()){
                    item.status = "finalizado";
                }else if(date.year() === today.year() && date.month() < today.month()){
                    item.status = "finalizado"
                }else if(date.year() === today.year() && date.month() === today.month() && date.date() < today.date()){
                    item.status = "finalizado"
                }
            }
            return item;
        })
        
        setAgendamentosLS(updated)
    }else{
        setAgendamentosLS([])
    }
}
export {getAgendamentosLS, setAgendamentosLS, updateAgendamentosLS}