import prismaClient from "../../prisma"

interface ListScheduleRequest {
  user_id: string
}

class ListScheduleService {
  async execute({ user_id }: ListScheduleRequest) {

    const schedules = await prismaClient.service.findMany({
      where: {
        user_id
      }, select: {
        id: true,
        customer: true,
        haircut: true
      }
    })

    return schedules
  }
}
export { ListScheduleService }