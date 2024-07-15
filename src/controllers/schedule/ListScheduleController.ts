import { Request, Response } from "express";
import { ListScheduleService } from "../../services";

class ListScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id

    const listScheduleService = new ListScheduleService()

    const schedules = await listScheduleService.execute({ user_id })

    return res.json(schedules)
  }
}

export { ListScheduleController }