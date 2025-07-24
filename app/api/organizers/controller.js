import { StatusCodes } from "http-status-codes";
import { createOrganizer } from "../../services/mongoose/users.js";

const create = async (req, res, next) => {
    try {
        const organizer = await createOrganizer(req);
        res.status(StatusCodes.CREATED).json({
            data: organizer
        })
    } catch (error) {
        next(error);
    }
}

export { create };