import { Router } from "express";
import { authenticated, authorize } from "../../middlewares/auth.js";
import { index } from "./controller.js";

const router = Router();

router.get(
    '/',
    authenticated,
    authorize('organizer', 'admin', 'owner'),
    index
)

export { router };