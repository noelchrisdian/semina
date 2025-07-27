import { StatusCodes } from "http-status-codes";
import { getOrders } from "../../services/mongoose/orders.js";

const index = async (req, res, next) => {
    try {
        const orders = await getOrders(req);
        res.status(StatusCodes.OK).json({
            data: {
                order: orders.data,
                pages: orders.pages,
                total: orders.total
            }
        })
    } catch (error) {
        next(error);
    }
}

export { index };