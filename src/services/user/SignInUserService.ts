import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from "jsonwebtoken"

interface SignInUserRequest {
  email: string
  password: string
}

class SignInUserService {
  async execute({ email, password }: SignInUserRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        email
      },
      include: {
        subscriptions: true
      }
    })

    if (!user) {
      throw new Error("Email/password incorrect")
    }

    const passwordMatch = await compare(password, user?.password)

    if (!passwordMatch) {
      throw new Error("Email/password incorrect")
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    )

    const { password: currentPassword, ...data } = user

    return { ...data, token }
  }
}

export { SignInUserService }