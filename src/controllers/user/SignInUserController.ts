import { Request, Response } from "express";
import { SignInUserService } from "../../services";

class SignInUserController {
  async handle(req: Request, res: Response) {

    const { email, password } = req.body

    const signInUserService = new SignInUserService()

    const session = await signInUserService.execute({ email, password })

    return res.json(session)
  }
}

export { SignInUserController }