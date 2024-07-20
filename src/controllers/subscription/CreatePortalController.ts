import { Request, Response } from "express";
import { CreatePortalService } from "../../services";

class CreatePortalController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id

    const createPortalService = new CreatePortalService()

    const portal = await createPortalService.execute({ user_id })


    return res.json(portal)
  }
}

export { CreatePortalController }