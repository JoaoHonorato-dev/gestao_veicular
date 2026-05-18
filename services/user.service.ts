import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
/**
 * Camada de serviço para operações de veículos.
 * Centraliza acesso ao Prisma e regras simples de persistência.
 */
export async function findUser(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserTeste(email: string): Promise<string> {
    return 'Teste';
}


type LoginInput = {
    email: string;
    password: string;
  };
  
export async function loginUser(data: LoginInput) {
    console.log("SERVICE");
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    let request_response:any;
    
    if(!user){
        request_response = {
            success: false,
            message: "Email de usuário não encontrado"
        }
    }else if( user.password !== data.password){
        request_response = {
            success: false,
            message: "Senha incorreta"
        }
    }
    else{
        request_response = {
            success: true,
            data: user,
            message: "Usuário encontrado, senha correta!"
        }
    }
    return request_response;
}