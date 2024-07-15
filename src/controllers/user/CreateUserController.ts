import { Request, Response } from "express";

import { CreateUserService } from "../../services";

class CreateUserController {
  async handle(req: Request, res: Response) {

    const { name, email, password } = req.body
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ email, password, name })

    return res.json(user)

  }

}

export { CreateUserController }