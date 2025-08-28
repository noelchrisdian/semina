import { StatusCodes } from "http-status-codes";
import {
    activateParticipant,
    getEvents,
    getEvent,
    getOrders,
    loginParticipant,
    registerParticipant,
    checkoutOrder,
    getPayments
} from "../../services/mongoose/participants.js";

const signup = async (req, res, next) => {
    try {
        const result = await registerParticipant(req);
        res.status(StatusCodes.CREATED).json({
            data: result
        })   
    } catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
        const result = await loginParticipant(req);
        res.status(StatusCodes.OK).json({
            data: {token: result}
        })
    } catch (error) {
        next(error);
    }
}

const active = async (req, res, next) => {
    try {
        const result = await activateParticipant(req);
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const getLandingPages = async (req, res, next) => {
    try {
        const events = await getEvents();
        res.status(StatusCodes.OK).json({
            data: events
        })
    } catch (error) {
        next(error);     
    }
}

const getDetailPage = async (req, res, next) => {
    try {
        const event = await getEvent(req);
        res.status(StatusCodes.OK).json({
            data: event
        })
    } catch (error) {
        next(error);        
    }
}

const getDashboard = async (req, res, next) => {
    try {
        const orders = await getOrders(req);
        res.status(StatusCodes.OK).json({
            data: orders
        })
    } catch (error) {
        next(error);        
    }
}

const checkout = async (req, res, next) => {
    try {
        const order = await checkoutOrder(req);
        res.status(StatusCodes.CREATED).json({
            data: order
        })
    } catch (error) {
        next(error);        
    }
}

const payments = async (req, res, next) => {
    try {
        const result = await getPayments(req);

        res.status(StatusCodes.OK).json({
            data: result
        })   
    } catch (error) {
        next(error);
    }
}

export {
    active,
    checkout,
    getLandingPages,
    getDetailPage,
    getDashboard,
    payments,
    signin,
    signup
}