import { StatusCodes } from "http-status-codes";
import {
    createOrganizer as serviceCreateOrganizer,
    createUser as serviceCreateUser
} from "../../services/mongoose/users.js";

const createOrganizer = async (req, res, next) => {
    try {
        const organizer = await serviceCreateOrganizer(req);
        res.status(StatusCodes.CREATED).json({
            data: organizer
        })
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = await serviceCreateUser(req);
        res.status(StatusCodes.CREATED).json({
            data: user
        })
    } catch (error) {
        next(error);
    }
}

export { createOrganizer, createUser };