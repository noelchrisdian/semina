import { Router } from "express";
import { create, find, index, remove, update } from "./controller.js";

const router = Router();

router
    .get('/', index)
    .post('/', create)

router
    .get('/:id', find)
    .put('/:id', update)
    .delete('/:id', remove)

export { router };