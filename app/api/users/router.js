import { Router } from "express";
import { authenticated, authorize } from '../../middlewares/auth.js';
import { createUser, getUsers } from "../organizers/controller.js";

const router = Router();

router
    .get(
        '/',
        authenticated,
        authorize('owner'),
        getUsers
    )
    .post(
    '/',
    authenticated,
    authorize('organizer'),
    createUser
)

export { router };