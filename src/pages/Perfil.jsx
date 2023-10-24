import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import colaboradores from "../users/colaboradores";

import BackBtn from "../components/BackBtn";
import ProfileInfo from "../components/ProfileInfo";
import ProfilePic from "../components/ProfilePic";
import LogoutBtn from "../components/LogoutBtn";
import {getTempLoginInfo} from '../utils/tempLoginInfo'
import runAuth from "../utils/runAuth";
import fornecedores from "../users/fornecedores";


function Perfil(){
    const navigate = useNavigate();
    let {id} = useParams();
    const authInfo = getTempLoginInfo();

    let profileInfo;
    
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
        runAuth(authInfo.actor, authInfo.senha, authInfo.id).then((value) => setAuth(value));
    }, [])

    if(auth){
        profileInfo = authInfo.actor === "Colaborador" ? colaboradores.filter(item => item.matricula === id)[0] : fornecedores.filter(item => item.id_fornecedor === id)[0];

        return (
            <div>
                <BackBtn />
                <div className={`container container-login ${position}`}>
                    <div className="row">
                        <div className="col-12 col-lg-5 col-xl-5 login-right-side sky-blue-bg position-relative ">
                            <LogoutBtn />
                            {authInfo.actor === "Colaborador" && 
                                <div>
                                    <ProfilePic src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMl9waG90b19vZl9nb2xkZW5fcmV0cmlldmVyX3B1cHB5X2p1bXBpbmdfaXNvbF83MTM2NGE2OS1kZTM0LTQzMWEtYWRkZS04ZTdmZWQ0ZGFiOTIucG5n.png" />
                                    <ProfileInfo label={"NOME"} value={profileInfo.informacoes.nome.toUpperCase()} />
                                    <ProfileInfo label={"MATRÍCULA"} value={profileInfo.matricula} />
                                    <ProfileInfo label={"E-MAIL"} value={profileInfo.informacoes.email} />
                                </div>
                            }
                            {authInfo.actor === "Fornecedor" && 
                                <div>
                                    <ProfileInfo label={"RAZÃO SOCIAL"} value={profileInfo.informacoesLegais[0].toUpperCase()} /> 
                                    <ProfileInfo label={"NOME FANTASIA"} value={profileInfo.informacoesLegais[1].toUpperCase()} />
                                    <ProfileInfo label={"CNPJ"} value={profileInfo.informacoesLegais[2]} />
                                    <ProfileInfo label={"LOGIN"} value={profileInfo.id_fornecedor} />
                                </div>
                            }
                            <p className="row m-auto text-center mt-5 mx-4" style={{color: "#ffff", fontWeight:700, fontFamily:"Martel Sans", fontSize: 12}}>
                                Para alteração dessas informações, por favor, entre em contato com a Arcomix.
                            </p> 
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

export default Perfil;