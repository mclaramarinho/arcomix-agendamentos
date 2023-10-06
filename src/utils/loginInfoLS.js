function getLoginInfoLS(){
    return JSON.parse(localStorage.getItem("loginInfo"));
}

function setLoginInfoLS(id, senha,actor){
    return localStorage.setItem("loginInfo", JSON.stringify({id: id, senha: senha, actor: actor}))
}

export {getLoginInfoLS, setLoginInfoLS}