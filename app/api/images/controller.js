import { StatusCodes } from "http-status-codes";
import { createImage } from "../../services/mongoose/images.js";

const create = async (req, res, next) => {
    try {
        const image = await createImage(req);
        res.status(StatusCodes.CREATED).json({ data: image });
    } catch (error) {
        next(error);
    }
}

export { create };