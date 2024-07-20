import { Router } from "express"

import {
  CreateHaircutController,
  CreateUserController,
  DetailUserController,
  SignInUserController,
  UpdateUserController,
  ListHaircutController,
  UpdateHaircutController,
  CheckSubscriptionController,
  CountHaircutController,
  DetailsHaircutController,
  NewScheduleController,
  ListScheduleController,
  FinishScheduleController,
  SubscriptionController,
  WebHooksController,
  CreatePortalController
} from "./controllers"
import { isAuthenticated } from "./middlewares"

const router = Router()

//users
router.post("/users", new CreateUserController().handle)
router.post("/signIn", new SignInUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)
router.put("/update-account", isAuthenticated, new UpdateUserController().handle)

//haircuts
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle)
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle)
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle)
router.get("/haircut/count", isAuthenticated, new CountHaircutController().handle)
router.get("/haircut/detail", isAuthenticated, new DetailsHaircutController().handle)

//subscriptions
router.get("/subscription/check", isAuthenticated, new CheckSubscriptionController().handle)
router.post("/subscription", isAuthenticated, new SubscriptionController().handle)
router.post("/create-portal", isAuthenticated, new CreatePortalController().handle)
router.post("/webhook", new WebHooksController().handle)

//schedule
router.post("/schedule", isAuthenticated, new NewScheduleController().handle)
router.get("/schedules", isAuthenticated, new ListScheduleController().handle)
router.delete("/schedule", isAuthenticated, new FinishScheduleController().handle)

export { router }