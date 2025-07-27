import { orderModel as Orders } from "../../api/orders/model.js";

const getOrders = async (req) => {
    const { limit = 10, page = 1, startDate, endDate } = req.query;
    let condition = {};

    if (req.user.role !== 'owner') {
        condition = { ...condition, 'historyEvent.organizer': req.user.organizer };
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59);

        condition = {
            ...condition,
            date: {
                $gte: start,
                $lt: end
            }
        }
    }

    const orders = await Orders.find(condition)
        .limit(limit)
        .skip(limit * (page - 1))
    const count = await Orders.countDocuments(condition);
    return { data: orders, pages: Math.ceil(count / limit), total: count };
}

export { getOrders };