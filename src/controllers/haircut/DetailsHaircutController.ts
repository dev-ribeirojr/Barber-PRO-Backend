import { Request, Response } from "express";
import { DetailsHaircutService } from "../../services";


class DetailsHaircutController {
  async handle(req: Request, res: Response) {

    const haircut_id = req.query.haircut_id as string

    const detailsHaircutService = new DetailsHaircutService()

    const haircut = await detailsHaircutService.execute({
      haircut_id
    })

    return res.json(haircut)
  }
}

export { DetailsHaircutController }