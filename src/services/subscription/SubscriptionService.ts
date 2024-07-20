import Stripe from "stripe"
import { stripe } from "../../utils/stripe"
import prismaClient from "../../prisma"

interface SubscriptionRequest {
  user_id: string
}

class SubscriptionService {
  async execute({ user_id }: SubscriptionRequest) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    let customerId = findUser.stripe_customer_id

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email
      })

      await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          stripe_customer_id: stripeCustomer.id
        }
      })

      customerId = stripeCustomer.id

    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: "required",
      line_items: [
        { price: process.env.STRIPE_PRICE, quantity: 1 },

      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return { sessionId: stripeCheckoutSession.id }
  }
}

export { SubscriptionService }