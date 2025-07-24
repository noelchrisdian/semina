import { Router } from "express";
import { login } from "./controller.js";

const router = Router();

router.post('/signin', login);

export { router };