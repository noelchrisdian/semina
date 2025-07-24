import { Router } from "express";
import { create } from "./controller.js";

const router = Router();

router.post('/', create);

export { router };