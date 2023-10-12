const tiposDeCarga = ["Frios", "Granel", "Carnes", "Descartáveis", "Conservas", "Materiais de limpeza"];
const tiposDeDescarga = ["Manual", "Paletizada"];
const recorrencias = ["Única", "Diária", "Semanal", "Mensal", "Trimestral", "Semestral", "Anual"];

function getTiposDeCarga(){
    return tiposDeCarga;
}
function getTiposDeDescarga(){
    return tiposDeDescarga;
}

function getRecorrencias(){
    return recorrencias;
}

export {getRecorrencias, getTiposDeCarga, getTiposDeDescarga}