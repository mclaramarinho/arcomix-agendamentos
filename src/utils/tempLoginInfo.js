function getTempLoginInfo(){
    return localStorage.getItem("tempLoginInfo");
}

function getParsedTempLoginInfo(){
    return JSON.parse(sessionStorage.getItem("tempLoginInfo"))
}

function setTempLoginInfo(id, senha, actor){
    return sessionStorage.setItem("tempLoginInfo", JSON.stringify({id: id, senha: senha, actor: actor}))
}

export {getTempLoginInfo, setTempLoginInfo, getParsedTempLoginInfo}