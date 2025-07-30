import { Router } from "express";
import { authenticated, authorize } from '../../middlewares/auth.js';
import { create, find, index, remove, update } from "./controller.js";

const router = Router();

router
    .get(
        '/',
        authenticated,
        authorize('organizer'),
        index
    )
    .post(
        '/',
        authenticated,
        authorize('organizer'),
        create
    )

router
    .get(
        '/:id',
        authenticated,
        authorize('organizer'),
        find
    )
    .put(
        '/:id',
        authenticated,
        authorize('organizer'),
        update
    )
    .delete(
        '/:id',
        authenticated,
        authorize('organizer'),
        remove
    )

export { router };