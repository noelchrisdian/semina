import { Router } from "express";
import { authenticated } from "../../middlewares/auth.js";
import { createOrganizer } from './controller.js';

const router = Router();

router.post('/', authenticated, createOrganizer);

export { router };