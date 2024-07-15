import prismaClient from "../../prisma"

interface DetailsHaircutRequest {
  haircut_id: string
}

class DetailsHaircutService {
  async execute({ haircut_id }: DetailsHaircutRequest) {

    const haircut = await prismaClient.haircurt.findFirst({
      where: {
        id: haircut_id
      }
    })

    return haircut
  }
}

export { DetailsHaircutService }