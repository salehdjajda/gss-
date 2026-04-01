import { Router, type IRouter } from "express";
import healthRouter from "./health";
import registrationsRouter from "./registrations";
import contactRouter from "./contact";
import dashboardRouter from "./dashboard";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(registrationsRouter);
router.use(contactRouter);
router.use(dashboardRouter);
router.use(adminRouter);

export default router;
