import {getAgendamentosLS} from './agendamentosLS.js'
import dayjs from 'dayjs'

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

//all appointments
const all = getAgendamentosLS();

//all finalized appointments
const finalizados = all.filter(agendamento => agendamento.status === 'finalizado');

//all delivered appointments
const entregues = finalizados.filter(agendamento => agendamento.isEntregue === true);

//all non-delivered appointments
const naoEntregues = finalizados.filter(agendamento => agendamento.isEntregue === false);

//all canceled appointments
const cancelados = all.filter(agendamento => agendamento.status === 'cancelado');

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GETS THE AMOUNT OF APPOINTMENTS PER SUPPLIER
//all suppliers' names
let empresas = [];
all.map(agendamento => {
    if(empresas.includes(agendamento.id_fornecedor) === false){
        empresas.push(agendamento.id_fornecedor)
    }
})

//amount of appointments per supplier
let qtdEmpresas = []
empresas.map(empresa => {
    let count = 0;
    all.map(agendamento => {
        if(empresa === agendamento.id_fornecedor){
            count++;
        }
    })
    qtdEmpresas.push(count);
})

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GETS THE AMOUNT OF FINALIZED APPOINTMENTS PER SUPPLIER

// gets the suppliers' names with finalized appointments
let empresasFinalizadas = [];
    finalizados.map(item => {
        if(!empresasFinalizadas.includes(item.id_fornecedor)){
            empresasFinalizadas.push(item.id_fornecedor)
        }
    })

// gets the number of finalized appointments per supplier
let qtdEmpresasFinalizadas = []
empresasFinalizadas.map(empresa => {
    let count = 0;
    finalizados.map(item => {
        if(empresa === item.id_fornecedor){
            count++;
        }
    })
    qtdEmpresasFinalizadas.push(count);
})

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GETS THE DELIVERY RATE PER SUPPLIER

// gets the number of delivered appointments per supplier
let qtdEmpresasEntregues = []
empresasFinalizadas.map(empresa => {
    let count = 0;
    entregues.map(item => {
        if(empresa === item.id_fornecedor){
            count++;
        }
    })
    qtdEmpresasEntregues.push(count);
})

// gets the number of non-delivered appointments per supplier
let qtdEmpresasNaoEntregues = []
empresasFinalizadas.map(empresa => {
    let count = 0;
    naoEntregues.map(item => {
        if(empresa === item.id_fornecedor){
            count++;
        }
    })
    qtdEmpresasNaoEntregues.push(count);
})

// Gets the delivery rates for each supplier
let percentEntregues = []
for(let i = 0; i < qtdEmpresasFinalizadas.length; i++){
    percentEntregues[i] = (qtdEmpresasEntregues[i] * 100) / qtdEmpresasFinalizadas[i];
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GETS THE CANCELATION RATE PER SUPPLIER


// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GETS THE DAYS OF THE WEEK WITH THE MOST AND LEAST APPOINTMENTS

// All days of the week (0 = sunday / 6 = saturday)
let allDays = [0, 1, 2, 3, 4, 5, 6];

// Checks each appointment and its day of the week
let schedulledDays = [];
all.map(agendamento => {
    const dayOfWeek = dayjs(agendamento.data).day();
    if(schedulledDays.includes(dayOfWeek) === false){
        schedulledDays.push(dayOfWeek)
    }
})

// Gets the number of appointments per day of the week
let qtdDays = []
allDays.map(day => {
    let count = 0
    if(schedulledDays.includes(day)){
        all.map(agendamento => {
            const dayOfWeek = dayjs(agendamento.data).day();
            if(day === dayOfWeek){
                count++;
            }
        })
    }
    qtdDays.push(count);
})

// Gets the day of the week with the most appointments
const maxDays = Math.max(...qtdDays);
const maxDaysIndex = qtdDays.indexOf(maxDays);

// Gets the day of the week with the least appointments
const minDays = Math.min(...qtdDays);
const minDaysIndex = qtdDays.indexOf(minDays);

export {
    qtdEmpresas, empresas, all, finalizados, entregues, naoEntregues, cancelados,
    qtdEmpresasFinalizadas, empresasFinalizadas, qtdEmpresasEntregues, qtdEmpresasNaoEntregues, 
    percentEntregues, maxDays, minDays, maxDaysIndex, minDaysIndex, qtdDays
}
