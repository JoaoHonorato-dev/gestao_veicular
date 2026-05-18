"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "styled-jsx/css";
import "./login.css";

type paramsApi = {
  "email": string;
  "password": string;
};
const login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  
    const data = await sendApiUser({ "email": email, "password": senha});
    console.log(data);
    if(data.success === false){
      setError(data.message);
      console.log(error);
    }else{
      router.push("/dashboard");
      // Enviar para home e salvar a informação de login temporário sessão 
      sessionStorage.setItem('usuarioLogado', JSON.stringify(data.data));
    }
  };

  async function sendApiUser(params:paramsApi) {
    console.log('Enviar parametros');

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  }

  return (
    <div className='container login-container'>
      <form onSubmit={submit}>
        <h1>Acess o sistema</h1>
        <div>
          <input className="inputLogin" type="email" name="email"
          id="email" 
          placeholder="Insira seu email"
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <input className="inputLogin" type="password" name="senha" 
          id="senha" 
          placeholder="insira a sua senha"
          onChange={(e) => setSenha(e.target.value)}/>
        </div>

        <div>
          <label className="remember-me" htmlFor="">
            <input type="checkbox" name="remember_me" id="remember_me" 
            onChange={(e) => setRemember(e.target.checked)}/>
            Lembre de mim
          </label>
          <br />
          <a className="forgot-password" href="#"> Esqueci minha senha</a>
        </div>
        <button className="btn-success">Entrar</button>
      </form>
    </div>
  )
}

export default login
