import { BadRequest } from "../../errors/bad request.js";
import { checkImage } from "./images.js";
import { NotFound } from "../../errors/not found.js";
import { paymentModel as Payments } from "../../api/payments/model.js";

const getPayments = async (req) => {
    const condition = { organizer: req.user.organizer };
    return await Payments.find(condition)
        .populate({
            path: 'image',
            select: '_id name'
        })
        .select('_id type status image')
}

const createPayment = async (req) => {
    const { type, image } = req.body;

    await checkImage(image);
    const check = await Payments.findOne({
        type,
        organizer: req.user.organizer
    })
    if (check) {
        throw new BadRequest(`Payment method existed`);
    }

    return Payments.create({
        image, 
        type,
        organizer: req.user.organizer
    })
}

const getPayment = async (req) => {
    const { id } = req.params;
    const payment = await Payments.findOne({
        _id: id,
        organizer: req.user.organizer
    })
        .populate({ path: 'image', select: '_id name' })
        .select('_id type status image')
    
    if (!payment) {
        throw new NotFound(`This payment method doesn't exist`);
    }

    return payment;
}

const updatePayment = async (req) => {
    const { id } = req.params;
    const { type, image } = req.body;

    await checkImage(image);
    const payment = await Payments.findOne({
        _id: { $ne: id },
        type,
        organizer: req.user.organizer
    })
    if (payment) {
        throw new BadRequest(`Payment method existed`);
    }

    const result = await Payments.findOneAndUpdate(
        { _id: id },
        { type, image, organizer: req.user.organizer },
        { runValidators: true, new: true }
    )
    if (!result) {
        throw new NotFound(`This payment method doesn't exist`);
    }

    return result;
}

const deletePayment = async (req) => {
    const { id } = req.params;
    const payment = await Payments.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer
    })
    if (!payment) {
        throw new NotFound(`This payment method doesn't exist`);
    }

    return payment;
}

const checkPayment = async (id) => {
    const payment = await Payments.findOne({ _id: id });
    if (!payment) {
        throw new NotFound(`This payment method doesn't exist`);
    }

    return payment;
}

export {
    checkPayment,
    createPayment,
    deletePayment,
    getPayments,
    getPayment,
    updatePayment
}