import { Request, Response } from "express";
import { CountHaircutService } from "../../services";

class CountHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.body

    const countHaircutService = new CountHaircutService()

    const count = await countHaircutService.execute({
      user_id
    })

    return res.json(count)
  }
}

export { CountHaircutController }