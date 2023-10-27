import {getTempLoginInfo} from '../utils/tempLoginInfo'
import dayjs from "dayjs";
import { getAgendamentosLS, setAgendamentosLS } from "./agendamentosLS";
import fornecedores from '../users/fornecedores'


function getList(listType){
    const authInfo = getTempLoginInfo();
    if(getAgendamentosLS() !== undefined){

        if(listType === 'agendamentos'){

            return new Promise((resolve, reject) => {
                const today = dayjs();

                let agend = getAgendamentosLS().map(item => {
                    const itemDate = dayjs(item.data);
                    if(itemDate.year() === today.year()){
                        if(itemDate.month() > today.month()){
                            return item
                        }else if(itemDate.month() === today.month()){
                            if(itemDate.date() >= today.date()){
                                return item
                            }
                        }
                    }else if(itemDate.year() > today.year()){
                        return item
                    }
                }).filter(item => item !== undefined && item.status === 'agendado' && item.isEntregue===false)
                
                if(agend !== undefined && agend.length > 0){

                    if(authInfo.actor === "Fornecedor"){
                        const razaoSocial = fornecedores.map(item => {
                            if(item.id_fornecedor === authInfo.id){
                                return item.informacoesLegais[1];
                            }
                        }).filter(item => item!==undefined)[0];
                        agend = agend.map(item => {
                            if(item.id_fornecedor === razaoSocial){
                                return item;
                            }
                        }).filter(item => item!==undefined)
                    }
                    resolve(agend)
                }else{
                    resolve([])
                }
            })
        }

        if(listType === "solicitacoes"){
            return new Promise((resolve, reject) => {
                const solicit = getAgendamentosLS().map(item => {
                    if(item.status === "pendente"){
                        return item
                    }
                }).filter(item => item !== undefined)

                if(solicit !== undefined && solicit.length > 0){
                    resolve(solicit)
                }else{
                    resolve([])
                }
            })
        }

        if(listType === "finalizados"){
            return new Promise((resolve, reject) => {
                let finalizados = getAgendamentosLS().map(item => {
                    if(item !== undefined && (item.status === "cancelado" || item.status === "finalizado" || item.isEntregue === true)){
                        return item
                    }
                }).filter(item => item !== undefined)
                
                
                if(authInfo.actor === "Fornecedor"){
                    const razaoSocial = fornecedores.map(item => {
                        if(item.id_fornecedor === authInfo.id){
                            return item.informacoesLegais[1];
                        }
                    }).filter(item => item!==undefined)[0];

                    const final = finalizados.map(item => {
                        if(item.id_fornecedor === razaoSocial){
                            return item;
                        }
                    }).filter(item => item!==undefined)
                    finalizados = final
                }
                resolve(finalizados)
            })
        }
    }else{
        setAgendamentosLS([])
        return []
    }
}


export {getList}