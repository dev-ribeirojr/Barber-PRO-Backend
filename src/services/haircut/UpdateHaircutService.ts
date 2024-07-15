import prismaClient from "../../prisma"

interface HaircutRequest {
  user_id: string
  haircut_id: string
  name: string
  price: number
  status: boolean | string
}

class UpdateHaircutService {
  async execute({ haircut_id, name, price, status = true, user_id }: HaircutRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      include: {
        subscriptions: true
      }
    })

    if (user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized")
    }

    const haircurt = await prismaClient.haircurt.update({
      where: {
        id: haircut_id
      },
      data: {
        name,
        price,
        status: status === true
      }
    })

    return haircurt
  }
}

export { UpdateHaircutService }