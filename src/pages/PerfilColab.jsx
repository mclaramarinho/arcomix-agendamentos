import React from "react";
import { useParams } from "react-router-dom";

import colaboradores from "../users/colaboradores";

import BackBtn from "../components/BackBtn";
import ProfileInfo from "../components/ProfileInfo";
import MsgAlterarInfo from "../components/MsgAlterarInfo";
import ProfilePic from "../components/ProfilePic";
import LogoutBtn from "../components/LogoutBtn";

function PerfilColab(){
    let {id} = useParams();
    const profileInfo = colaboradores.filter(item => item.matricula === id)[0];

    return (
        <div>
            <BackBtn />
            <div className="container container-login position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div className="col-lg-5 col-xl-5 login-right-side position-relative">
                        <LogoutBtn />
                        <ProfilePic src={"https://this-person-does-not-exist.com/img/avatar-gen995b349e71b0e38e624db05f5360bba5.jpg"} />
                        
                        <ProfileInfo label={"NOME"} value={profileInfo.informacoes.nome.toUpperCase()} />
                        <ProfileInfo label={"MATRÍCULA"} value={profileInfo.matricula} />
                        <ProfileInfo label={"E-MAIL"} value={profileInfo.informacoes.email} />
                        
                        <MsgAlterarInfo />
                    </div>

                    {/* NOT FINISHED */}
                    <div className="col-lg-7 col-xl-7 login-left-side">
                        <h2 className="row m-auto mt-5" style={{width:"fit-content", fontWeight:700, color:"#343232"}}>ALTERAR SENHA</h2>
                        <form className="row m-auto mt-5 w-50">
                            <div className="">
                                <label htmlFor="senha-atual">SENHA ATUAL</label>
                                <input type="password" />
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
            <p></p>
        </div>
        
    )
}

export default PerfilColab;