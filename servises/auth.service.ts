import bcrypt from "bcryptjs"

import {
  createUser,
  findUserByEmail,
  findUserById

} from "../repositories/auth.repository"

import { generateToken } from "../lib/jwt"

import {
  LoginDto,
  RegisterDto,
} from "../types/auth.types"

export async function registerService(
  data: RegisterDto
) {
  const existingUser = await findUserByEmail(
    data.email
  )

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  )

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  })

  return {
    message: "User created",
    user,
  }
}

export async function loginService(
  data: LoginDto
) {
  const user = await findUserByEmail(
    data.email
  )

  if (!user) {
    throw new Error("Invalid credentials")
  }

  const validPassword = await bcrypt.compare(
    data.password,
    user.password
  )

  if (!validPassword) {
    throw new Error("Invalid credentials")
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  })

  return {
    message: "Login success",
    token,
    user,
  }

 
}

 export async function getUserById(id: string) {
  return await findUserById(id);
}