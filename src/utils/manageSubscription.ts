
import prismaClient from "../prisma/index"
import { stripe } from "./stripe"

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false

) {
  const findUser = await prismaClient.user.findFirst({
    where: {
      stripe_customer_id: customerId
    },
    include: {
      subscriptions: true
    }
  })

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id
  }

  if (createAction) {
    try {
      await prismaClient.subscription.create({
        data: subscriptionData
      })
    } catch (error) {
      console.log("ERRO CREATE", error)
    }
  } else {
    if (deleteAction) {
      await prismaClient.subscription.delete({
        where: {
          id: subscriptionId
        }
      })
      return
    }

    try {

      await prismaClient.subscription.update({
        where: {
          id: subscriptionId
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id
        }
      })

    } catch (error) {
      console.log("ERRO UPDATE", error)
    }
  }
}