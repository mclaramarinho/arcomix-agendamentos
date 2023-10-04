import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import colaboradores from "../users/colaboradores";

import BackBtn from "../components/BackBtn";
import ProfileInfo from "../components/ProfileInfo";
import MsgAlterarInfo from "../components/MsgAlterarInfo";
import ProfilePic from "../components/ProfilePic";
import LogoutBtn from "../components/LogoutBtn";

import runAuth from "../utils/runAuth";


function PerfilColab(){

    // ### MAKE A HOOK UNDER THE FOLDER HOOKS TO SAVE AUTH AND PROFILE INFO ###

    let {id} = useParams();
    let profileInfo;
    
    const navigate = useNavigate();

    const authInfo = JSON.parse(sessionStorage.getItem('tempLoginInfo'));

    const [auth,setAuth] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);
    const [position, setPosition] = useState();
    setInterval(()=>{
        setWidth(window.innerWidth);
    }, [100])
    useEffect(() =>{
        if(width > 992){
            setPosition("top-50 start-50 translate-middle")
        }else{
            setPosition("")
        }
    }, [width])
    useEffect(() =>{
        getAuth();
    }, [])
    
    async function getAuth () {
        let result = await runAuth(authInfo.actor, authInfo.senha, authInfo.id);
        return setAuth(result);
    }


    if(auth){
        profileInfo = colaboradores.filter(item => item.matricula === id)[0];
        return (
            <div>
                <BackBtn />
                <div className={`container container-login ${position}`}>
                    <div className="row">
                        <div className="col-12 col-lg-5 col-xl-5 login-right-side sky-blue-bg position-relative ">
                            <LogoutBtn />
                            <ProfilePic src={"https://this-person-does-not-exist.com/img/avatar-gen995b349e71b0e38e624db05f5360bba5.jpg"} />
                            
                            <ProfileInfo label={"NOME"} value={profileInfo.informacoes.nome.toUpperCase()} />
                            <ProfileInfo label={"MATRÍCULA"} value={profileInfo.matricula} />
                            <ProfileInfo label={"E-MAIL"} value={profileInfo.informacoes.email} />
                            
                            <MsgAlterarInfo />
                        </div>

                        {/* ######## NOT FINISHED ######## */}
                        <div className="col-12 col-lg-7 col-xl-7 login-left-side">
                            <h2 className="row m-auto mt-5 bold justify-content-center">ALTERAR SENHA</h2>

                            <div className="row m-auto mb-3">
                                <h3 className="row m-auto mt-5 bold" style={{width:"fit-content", color: "#343232"}}>
                                    SENHA ATUAL
                                </h3>
                                <input type="password"
                                        className="form-control text-center py-2 bold pt-3"
                                        style={{borderRadius:"100vw", fontSize:"12px", color: "#A09F9F", border:"1px solid #343232 !important"}}
                                />
                            </div>
                            <div className="row m-auto mb-3">
                                <h3 className="row m-auto bold mt-5" style={{width:"fit-content", color: "#343232"}}>
                                    NOVA SENHA
                                </h3>
                                <input type="password"
                                        className="form-control bold text-center py-2 pt-3"
                                        style={{borderRadius:"100vw", fontSize:"12px", color: "#A09F9F", border:"1px solid #343232 !important"}}
                                />
                            </div>
                            <div className="row m-auto mb-5">
                                <h3 className="row m-auto bold mt-5" style={{width:"fit-content", color: "#343232"}}>
                                    REPITA A SENHA
                                </h3>
                                <input type="password"
                                        className="form-control bold text-center py-2 pt-3"
                                        style={{borderRadius:"100vw", fontSize:"12px", color: "#A09F9F", border:"1px solid #343232 !important"}}
                                />
                            </div>   
                            
                            <div className="row m-auto">
                                <button className="btn btn-lg m-auto bold dark-blue-bg perfil-btn" type="submit">PROSSEGUIR</button>
                            </div>
                        </div>
                        {/* ######## NOT FUNCTIONAL YET ######## */}
                    </div>
                </div>
                
                <p></p>
            </div>
            
        )
    }else{
        return navigate('/login')
    }
    
}

export default PerfilColab;