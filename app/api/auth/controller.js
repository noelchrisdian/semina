import { StatusCodes } from "http-status-codes";
import { signin } from "../../services/mongoose/auth.js";

const login = async (req, res, next) => {
    try {
        const result = await signin(req);
        res.status(StatusCodes.CREATED).json({
            data: { token: result }
        })
    } catch (error) {
        next(error);
    }
}

export { login };