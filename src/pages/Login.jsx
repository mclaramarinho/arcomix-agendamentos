import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/big_logo.png'
import runAuth from "../utils/runAuth";

function Login (){
    const navigate = useNavigate();

    //login info
    const [loginId, setLoginId] = useState("");
    const [actor, setActor] = useState("Colaborador")
    const [pswd, setPswd] = useState("")
    
    const [lembrar, setLembrar] = useState(false);
    //auth controls
    const [auth, setAuth] = useState(false);
    const [submit, setSubmit] = useState(false);
    

    //To login automatically if info are saved
    useEffect(() => {
        if(localStorage.getItem('loginInfo') !== null){
            const storedInfo = JSON.parse(localStorage.getItem('loginInfo'));
            getResult(storedInfo)
        }
        async function getResult(storedInfo) {
            const result = await runAuth(storedInfo.actor, storedInfo.senha, storedInfo.id);
            setAuth(result);
            return (result === true) && navigate(`/${storedInfo.actor}/${storedInfo.id}`);
        }
    }, [])

    //redirects to dashboard if authorized
    useEffect(() => {
        (submit && auth) && navigate(`/${actor}/${loginId}`);
    }, [auth])


    async function onSubmit(actor, pswd, loginId){
        const result = await runAuth(actor, pswd, loginId);
        if(result && lembrar){
            localStorage.setItem('loginInfo', JSON.stringify({id: loginId, senha: pswd, actor: actor}));
        }
        return setAuth(result);
    }

    return(
        <div className="container container-login position-absolute top-50 start-50 translate-middle">

            <form onSubmit={(e)=>{setSubmit(true); onSubmit(actor, pswd, loginId); e.preventDefault()}} className="row">
                <div className="col-lg-5 col-xl-5" id="login-right-side">
                    <div className="row text-center my-5 mt-5 pt-5">
                        <h1 className="actor">{actor}</h1>
                    </div>
                    <div className="row position-relative mb-5">
                        <hr className="border border-light opacity-100 w-50 m-auto" />
                        <i class="fa-solid fa-arrow-right-arrow-left btn btn-sm position-absolute start-50 translate-middle swap-btn"
                            onClick={() => {(actor==="Colaborador") ? setActor("Fornecedor") : setActor("Colaborador");}}
                        />
                    </div> 
                    <div className="row m-auto mb-5" style={{width:"fit-content"}}>
                        <img className="mx-auto logo-login" src={logo} alt="" />
                    </div>
                </div>

                <div className="col-lg-7 col-xl-7" id="login-left-side">

                    <div className="mt-5 pt-5">
                        <div className="row text-center">
                            <h1 className="bem-vindo">Bem vindo</h1>
                        </div>
                        <div className="row text-center mt-3">
                            {   (submit && !auth) && 
                                <p className="auth-error">Alguma informação está incorreta. Verifique-as e tente novamente!</p>
                            }
                        </div>
                        <div className="row mt-5">
                            <div className="group-input row m-auto" >
                                <div className="col-2 input-icon text-center pt-1 p-0">
                                    <i class="fa-regular fa-user"></i>
                                </div>
                                <input type="text" class="form-control col text-center"
                                    placeholder={(actor==="Colaborador") ? "Matrícula" : "ID Login"}
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                />
                            </div>
                            <div className="group-input row m-auto">
                                <div className="col-2 input-icon text-center pt-1 p-0">
                                    <i class="fa-solid fa-lock mt-2"></i>
                                </div>
                                <input type="password" class="form-control col text-center" placeholder="Senha" value={pswd}
                                    onChange={(e) => setPswd(e.target.value)}
                                />
                            </div>
                            <div className="group-input group-options row m-auto mb-5 mt-1 px-0">
                                <div className="col-7 p-0">
                                    <span>
                                        <input className="align-middle me-2" type="checkbox" name="lembrar" id="lembrar" onChange={()=>setLembrar(!lembrar)}/>
                                    </span>
                                    <label className="col option-label" htmlFor="lembrar">Lembre-se de mim</label>
                                </div>
                                <div className="col-5 p-0 text-end">
                                    <a href="" className="p-0 option-label">Esqueci a senha</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn btn-lg entrar-btn m-auto" type="submit">ENTRAR</button>
                    </div>
                    
                </div>
            </form>

        </div>
    )
}

export default Login;   