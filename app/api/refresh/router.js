import { Router } from "express";
import { index } from "./controller.js";

const router = Router();

router.get('/:refreshToken', index);

export { router };