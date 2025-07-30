import { StatusCodes } from "http-status-codes";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "../../services/mongoose/payments.js";

const create = async (req, res, next) => {
    try {
        const payment = await createPayment(req);
        res.status(StatusCodes.CREATED).json({
            data: payment
        })
    } catch (error) {
        next(error);        
    }
}

const index = async (req, res, next) => {
    try {
        const payments = await getPayments(req);
        res.status(StatusCodes.OK).json({
            data: payments
        })
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const payment = await getPayment(req);
        res.status(StatusCodes.OK).json({
            data: payment
        })
    } catch (error) {
        next(error);       
    }
}

const update = async (req, res, next) => {
    try {
        const payment = await updatePayment(req);
        res.status(StatusCodes.OK).json({
            data: payment
        })
    } catch (error) {
        next(error);        
    }
}

const remove = async (req, res, next) => {
    try {
        const payment = await deletePayment(req);
        res.status(StatusCodes.OK).json({
            data: payment
        })
    } catch (error) {
        next(error);
    }
}

export { create, index, find, update, remove };