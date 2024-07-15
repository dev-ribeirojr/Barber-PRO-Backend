import { Request, Response } from "express";
import { FinishScheduleService } from "../../services";


class FinishScheduleController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id
    const schedule_id = req.query.schedule_id as string

    const finishScheduleService = new FinishScheduleService()

    const schedule = await finishScheduleService.execute({
      user_id,
      schedule_id
    })

    return res.json(schedule)
  }
}

export { FinishScheduleController }