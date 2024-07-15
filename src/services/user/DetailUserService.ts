import prismaClient from "../../prisma"

interface DetailsUserRequest {
  user_id: string
}

class DetailUserService {
  async execute({ user_id }: DetailsUserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      include: {
        subscriptions: true
      }
    })

    const { password, ...data } = user

    return data
  }
}

export { DetailUserService }