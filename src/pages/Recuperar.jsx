import React from "react";
import logo from '../assets/big_logo.png'
import { useState } from "react";

function Recuperar(){
    const [userID, setUser] = useState("");
    const [actor, setActor] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [trouble, setTrouble] = useState(false);
    function onSubmit(){
        if(userID !== undefined && actor !== undefined && userID !== "" && actor !== ""){
            setIsSubmitted(true);
        }
    }
    return(
        <div className="container container-login overflow-clip position-absolute top-50 start-50 translate-middle">

            <form className="row">
                <div className="col-lg-5 col-xl-5 login-right-side overflow-clip sky-blue-bg">
                    <div className="row m-auto width-fit position-relative translate-middle top-50 start-50">
                        <img className="m-auto w-100" src={logo} alt="" />  
                    </div>
                        
                </div>

                {!isSubmitted &&
                    <div className="col-lg-7 col-xl-7 login-left-side overflow-clip">

                        <div className="mt-5 pt-5">
                            <div className="row text-center gutter-x-0">
                                <h1 className="bem-vindo bolder width-fit m-auto">Recuperar Senha</h1>
                            </div>
                            <div className="row mt-3 m-auto justify-content-center">
                                Preencha as informações abaixo para recuperar sua senha.
                            </div>
                            <div className="row mt-5">
                                <div className="group-input row m-auto" >
                                    <div className="col-2 input-icon text-center pt-1 p-0">
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                    <input type="text" required class="form-input no-outline no-box-shadow form-control col text-center" placeholder="Matrícula ou ID" onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <select class="row group-input form-select-sm m-auto no-outline p-0" required aria-label="Você é colaborador ou fornecedor?" onChange={(e) => setActor(e.target.value)}>
                                    <option selected disabled>Selecione uma opção...</option>
                                    <option value="colaborador">Colaborador</option>
                                    <option value="fornecedor">Fornecedor</option>
                                </select>
                                
                            </div>
                        </div>

                        <div className="row m-auto">
                            <button className="btn btn-lg entrar-btn m-auto width-fit bold dark-blue-bg" onClick={e => e.preventDefault()} onMouseUp={() => onSubmit()} type="submit">CONTINUAR</button>
                        </div>
                    </div>
                }
                {isSubmitted && !trouble && (
                     <div className="col-lg-7 col-xl-7 login-left-side overflow-clip">

                        <div className="mt-5 p-5">
                            <div className="row text-center gutter-x-0 mb-5">
                                <h1 className="bem-vindo bolder width-fit m-auto">Email Enviado</h1>
                            </div>
                            <div className="row mt-3 m-auto justify-content-center text-center font-14 mt-5 mb-5 LH-20">
                                Se esse usuário existir, um email será enviado para o endereço cadastrado com o procedimento para recuperação de senha.
                            </div>
                            <a onMouseUp={() => setTrouble(true)} onClick={e => e.preventDefault()} href="#" className="row mt-3 m-auto justify-content-center font-14 color-red bold no-decoration">
                                Não recebi o email.
                            </a>
                        </div>
                    </div>
                )}
                {isSubmitted && trouble && (
                    <div className="col-lg-7 col-xl-7 login-left-side overflow-clip">

                        <div className="mt-5 p-5">
                            <div className="row text-center gutter-x-0 mb-5">
                                <h1 className="bem-vindo bolder width-fit m-auto">Enviamos Novamente</h1>
                            </div>
                            <div className="row mt-3 m-auto justify-content-center text-center font-14 mt-5 mb-5 LH-20">
                                Enviamos outro email para o endereço vinculado a sua conta. Caso ainda não o tenha recebido, entre em contato com a equipe de gerenciamento Arcomix pelo telefone: <br /> <b>(081) 9 8756-4532</b>
                            </div>
                        </div>
                    </div>
                )}
            </form>

        </div>
    );
}
export default Recuperar;