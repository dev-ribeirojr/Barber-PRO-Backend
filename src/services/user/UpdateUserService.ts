import prismaClient from "../../prisma"

interface UserRequest {
  user_id: string
  name: string
  address: string
}


class UpdateUserService {
  async execute({ address, name, user_id }: UserRequest) {

    try {

      const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
          id: user_id
        }
      })

      if (!userAlreadyExist) {
        throw new Error("User not found")
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          name,
          address,
          updated_at: new Date()
        },
        include: {
          subscriptions: true
        }
      })

      const { password, ...data } = userUpdated

      return data
    } catch (err) {
      throw new Error("Error an update the user!")
    }
  }
}

export { UpdateUserService }