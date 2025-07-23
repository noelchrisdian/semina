import { Router } from "express";
import { upload } from "../../middlewares/multer.js";
import { create } from "./controller.js";

const router = Router();

router.post('/', upload.single('photo'), create)

export { router };