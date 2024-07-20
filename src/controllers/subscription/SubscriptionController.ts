import { Request, Response } from "express";
import { SubscriptionService } from "../../services";

class SubscriptionController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id

    const subscriptionService = new SubscriptionService()
    const subscription = await subscriptionService.execute({ user_id })

    return res.json(subscription)
  }

}

export { SubscriptionController }