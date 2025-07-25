import { Router } from "express";
import { authenticated } from '../../middlewares/auth.js';
import { createUser } from "../organizers/controller.js";

const router = Router();

router.post('/', authenticated, createUser);

export { router };