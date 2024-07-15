import { Request, Response } from "express";
import { NewScheduleService } from "../../services";

class NewScheduleController {

  async handle(req: Request, res: Response) {

    const { customer, haircut_id } = req.body
    const user_id = req.user_id

    const newScheduleService = new NewScheduleService()

    const schedule = await newScheduleService.execute({
      customer,
      haircut_id,
      user_id,
    })

    return res.json(schedule)

  }
}

export { NewScheduleController }