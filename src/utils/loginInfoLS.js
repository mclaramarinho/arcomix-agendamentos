function getLoginInfoLS(){
    return JSON.parse(localStorage.getItem("loginInfo"));
}

function setLoginInfoLS(value){
    return localStorage.setItem("loginInfo", JSON.stringify(value))
}

export {getLoginInfoLS, setLoginInfoLS}