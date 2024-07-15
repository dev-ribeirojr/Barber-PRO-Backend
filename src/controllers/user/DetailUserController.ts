import { Request, Response } from "express";
import { DetailUserService } from "../../services";

class DetailUserController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id
    const detailUserService = new DetailUserService()

    const detailUser = await detailUserService.execute({ user_id })

    return res.json(detailUser)
  }
}

export { DetailUserController }