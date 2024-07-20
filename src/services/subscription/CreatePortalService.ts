import prismaClient from "../../prisma"
import { stripe } from "../../utils/stripe"


interface CreatePortalRequest {
  user_id: string
}

class CreatePortalService {
  async execute({ user_id }: CreatePortalRequest) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    let sessionId = findUser.stripe_customer_id

    if (!sessionId) {
      return { message: "User not found" }
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL
    })

    return { sessionId: portalSession.url }

  }
}

export { CreatePortalService }