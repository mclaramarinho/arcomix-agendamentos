import dayjs from "dayjs";

function checkAvailableTime(dateObj, agendamentos, tipoRetorno){
    return new Promise((resolve, reject) => {
        const selectedDay = dayjs(dateObj).format("DD/MM/YYYY");
        if(tipoRetorno === 'collapsed' && selectedDay===dayjs().format("DD/MM/YYYY")){
                resolve( [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
        }else{
            let agendamentosConfirmados = agendamentos.map(item => {
                if(item.status === "agendado" && dayjs(item.data).format("DD/MM/YYYY")===selectedDay){
                    return item;
                }
            }).filter(item => item!==undefined) //makes sure to return only the items which are not undefined
            resolve(agendamentosConfirmados.length > 0 ? (agendamentosConfirmados.map(item => dayjs(item.data).hour())) : ([]))
        }
    })
    
}

export default checkAvailableTime;