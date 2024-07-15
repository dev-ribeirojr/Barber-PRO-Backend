import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services";

class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const { name, price, status, haircut_id } = req.body
    const user_id = req.user_id

    const updateHaircutService = new UpdateHaircutService()

    const haircurt = await updateHaircutService.execute({
      user_id,
      haircut_id,
      name,
      price,
      status,
    })

    return res.json(haircurt)
  }
}

export { UpdateHaircutController }