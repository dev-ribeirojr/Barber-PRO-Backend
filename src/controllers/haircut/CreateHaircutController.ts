import { Request, Response } from "express";
import { CreateHaircutService } from "../../services";



class CreateHaircutController {
  async handle(req: Request, res: Response) {
    const { name, price } = req.body
    const user_id = req.user_id

    const createHaircutService = new CreateHaircutService()

    const haircut = await createHaircutService.execute({
      name,
      price,
      user_id
    })

    return res.json(haircut)
  }
}

export { CreateHaircutController }