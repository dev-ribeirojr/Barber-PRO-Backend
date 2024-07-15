import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ email, name, password }: UserRequest) {

    if (!email || email === "") {
      throw new Error("required email")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new Error("email alredy exists")
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
    })

    const { password: currentPassword, ...data } = user

    return data
  }
}

export { CreateUserService }