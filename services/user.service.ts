import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const TEST_USER = {
  id: 0,
  name: "Usuário Teste Cursor",
  email: "teste_cursor@tete",
  password: "123",
} as const;
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
  if (
    data.email === TEST_USER.email &&
    data.password === TEST_USER.password
  ) {
    const { password: _, ...userWithoutPassword } = TEST_USER;
    return {
      success: true,
      data: {
        ...userWithoutPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: "Login realizado com usuário de teste.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        success: false,
        message: "Email de usuário não encontrado",
      };
    }

    if (user.password !== data.password) {
      return {
        success: false,
        message: "Senha incorreta",
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
      message: "Usuário encontrado, senha correta!",
    };
  } catch {
    return {
      success: false,
      message: "Erro ao conectar com o banco de dados. Use o usuário de teste.",
    };
  }
}