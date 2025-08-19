import { StatusCodes } from "http-status-codes";
import { getUserRefreshToken } from "../../services/mongoose/refresh.js"


const index = async (req, res, next) => {
    try {
        const result = await getUserRefreshToken(req);
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
}

export { index };