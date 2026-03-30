import { Router, type IRouter } from "express";
import healthRouter from "./health";
import registrationsRouter from "./registrations";
import contactRouter from "./contact";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(registrationsRouter);
router.use(contactRouter);
router.use(dashboardRouter);

export default router;
