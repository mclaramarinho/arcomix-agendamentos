import fornecedores from "../users/fornecedores";
import colaboradores from "../users/colaboradores";

function runAuth(actor, pswd, loginId){
    return new Promise((resolve, reject) => {
        if(actor==="Colaborador"){
            colaboradores.map(item =>{
                if(item.matricula===loginId && item.senha===pswd){
                    resolve(true);
                }
            })
        }else{
            fornecedores.map(item => {
                if(item.id_fornecedor===loginId && item.senha===pswd){
                    resolve(true);
                }
            })
        }
    })
    
}

export default runAuth;