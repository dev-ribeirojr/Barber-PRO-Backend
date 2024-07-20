import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";
import { saveSubscription } from "../../utils/manageSubscription";

class WebHooksController {
  async handle(req: Request, res: Response) {

    let event: Stripe.Event = req.body

    let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"]

      try {

        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        )

      } catch (error) {
        console.log("Webhook signature failed", error.message)
        return res.status(400)
      }
    }

    switch (event.type) {
      case "customer.subscription.deleted":

        const payment = event.data.object as Stripe.Subscription

        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        )

        break
      case "customer.subscription.updated":

        const paymentUpdate = event.data.object as Stripe.Subscription

        await saveSubscription(
          paymentUpdate.id,
          paymentUpdate.customer.toString(),
        )
        break
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session

        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true,
        )

        break
      default:
        console.log("Evento desconhecido", event.type)
    }

    res.send()
  }
}
export { WebHooksController }