import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/big_logo.png'
import runAuth from "../utils/runAuth";
import { getTempLoginInfo, setTempLoginInfo } from "../utils/tempLoginInfo";
import { getLoginInfoLS, setLoginInfoLS } from "../utils/loginInfoLS";
import { getAgendamentosLS } from "../utils/agendamentosLS";

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
        getAgendamentosLS()

        //To prevent getting back to the login screen if already logged in
        if(getTempLoginInfo()!==undefined && getTempLoginInfo()!==null && Object.keys(getTempLoginInfo()).length === 3){
            const authInfo = getTempLoginInfo();
            navigate(`/${authInfo.actor.toLowerCase()}/${authInfo.id}`)
        }else if(getLoginInfoLS() !== undefined && getLoginInfoLS() !== null && getLoginInfoLS().length>1){
            const storedInfo = getLoginInfoLS();
            runAuth(storedInfo.actor, storedInfo.senha, storedInfo.id).then((value) => {
                setAuth(value)
                (value === true) && setTempLoginInfo(storedInfo.id, storedInfo.senha, storedInfo.actor) && navigate(`/${storedInfo.actor.toLowerCase()}/${storedInfo.id}`);
            })
        }
    })

    //redirects to dashboard if authorized
    useEffect(() => {
        (submit && auth) && navigate(`/${actor.toLowerCase()}/${loginId}`);
    }, [auth])

    
    async function onSubmit(actor, pswd, loginId){
        const result = await runAuth(actor, pswd, loginId);
        result && setTempLoginInfo(loginId, pswd, actor);
        if(result && lembrar){
            setLoginInfoLS(loginId, pswd, actor)
        }
        return setAuth(result);
    }

    return(
        <div className="container mt-0 container-login position-absolute top-50 start-50 translate-middle">

            <form onSubmit={(e)=>{setSubmit(true); onSubmit(actor, pswd, loginId); e.preventDefault()}} className="row">
                <div className="col-lg-5 col-xl-5 login-right-side overflow-clip sky-blue-bg position-relative">
                    <div className="row text-center mt-3 pt-3 mt-lg-5 pt-lg-5">
                        <h1 className="actor bold">{actor}</h1>
                    </div>
                    <div className="row position-relative mb-5">
                        <hr className="border border-light opacity-100 w-50 m-auto" />
                        <i class="fa-solid fa-arrow-right-arrow-left btn btn-sm position-absolute start-50 translate-middle swap-btn width-fit"
                            onClick={() => {(actor==="Colaborador") ? setActor("Fornecedor") : setActor("Colaborador");}}
                        />
                    </div> 
                    <div className="row m-auto mb-5" style={{width:"fit-content"}}>
                        <img className="mx-auto logo-login" src={logo} alt="" />
                    </div>
                </div>

                <div className="col-lg-7 col-xl-7 login-left-side overflow-clip position-relative">

                    <div className="mt-3 pt-3 mt-lg-5 pt-lg-5">
                        <div className="row text-center">
                            <h1 className="bem-vindo bolder width-fit m-auto">Bem vindo</h1>
                        </div>
                        <div className="row text-center mt-3">
                            {   (submit && !auth) && 
                                <p className="color-red bold">Alguma informação está incorreta. Verifique-as e tente novamente!</p>
                            }
                        </div>
                        <div className="row mt-5">
                            <div className="group-input row m-auto" >
                                <div className="col-2 input-icon text-center pt-1 p-0">
                                    <i class="fa-regular fa-user"></i>
                                </div>
                                <input type="text" class="form-input no-outline no-box-shadow form-control col text-center"
                                    placeholder={(actor==="Colaborador") ? "Matrícula" : "ID Login"}
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                />
                            </div>
                            <div className="group-input row m-auto">
                                <div className="col-2 input-icon text-center pt-1 p-0">
                                    <i class="fa-solid fa-lock mt-2"></i>
                                </div>
                                <input type="password" class="form-input no-outline no-box-shadow form-control col text-center" placeholder="Senha" value={pswd}
                                    onChange={(e) => setPswd(e.target.value)}
                                />
                            </div>
                            <div className="group-input group-options no-outline row m-auto mb-5 mt-0 px-0">
                                <div className="col-12 col-md-7 p-0 text-center text-md-start">
                                    <span>
                                        <input className="align-middle me-2" type="checkbox" name="lembrar" id="lembrar" onChange={()=>setLembrar(!lembrar)}/>
                                    </span>
                                    <label className="col option-label" htmlFor="lembrar">Lembre-se de mim</label>
                                </div>
                                <div className="col-12 col-md-5 p-0 text-md-end text-center">
                                    <a href="/recuperar" className="p-0 option-label">Esqueci a senha</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-auto">
                        <button className="btn btn-lg entrar-btn m-auto width-fit bold dark-blue-bg" type="submit">ENTRAR</button>
                    </div>
                    
                </div>
            </form>

        </div>
    )
}
export default Login;