import prismaClient from "../../prisma"

interface CountHaircutRequest {
  user_id: string
}

class CountHaircutService {
  async execute({ user_id }: CountHaircutRequest) {
    const count = await prismaClient.haircurt.count({
      where: {
        user_id
      }
    })
    return count
  }

}

export { CountHaircutService }