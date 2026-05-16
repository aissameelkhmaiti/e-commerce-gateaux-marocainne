import { prisma } from "../lib/db"

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  return prisma.user.create({
    data,
  })
}

 

export async function findUserById(id: string) {
   return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}