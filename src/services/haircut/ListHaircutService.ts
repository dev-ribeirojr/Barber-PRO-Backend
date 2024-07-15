import prismaClient from "../../prisma"

interface HaircutRequest {
  user_id: string
  status: boolean | string
}

class ListHaircutService {
  async execute({ status, user_id }: HaircutRequest) {

    const haircurts = await prismaClient.haircurt.findMany({
      where: {
        user_id,
        status: status === "true"
      }
    })

    return haircurts

  }
}

export { ListHaircutService }