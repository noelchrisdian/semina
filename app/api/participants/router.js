import { Router } from "express";
import { authenticatedParticipant } from "../../middlewares/auth.js";
import { active, checkout, getDashboard, getDetailPage, getLandingPages, signin, signup } from "./controller.js";

const router = Router();

router
    .post('/signup', signup)
    .post('/signin', signin)
    .put('/active', active)
    .get('/events', getLandingPages)
    .get('/events/:id', getDetailPage)
    .get(
        '/orders',
        authenticatedParticipant,
        getDashboard
    )
    .post(
        '/checkout',
        authenticatedParticipant,
        checkout
    )

export { router };