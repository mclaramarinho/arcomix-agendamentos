function getLocalStorage(key){
    return localStorage.getItem(key);
}

function getParsedLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}


function setLocalStorage(key, value){
    return localStorage.setItem(key, JSON.stringify(value))
}



export {getLocalStorage, setLocalStorage, getParsedLocalStorage}