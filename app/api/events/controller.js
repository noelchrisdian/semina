import { StatusCodes } from "http-status-codes";
import { createEvent, deleteEvent, findEvent, getEvents, updateEvent } from "../../services/mongoose/events.js";

const create = async (req, res, next) => {
    try {
        const event = await createEvent(req);
        res.status(StatusCodes.CREATED).json({
            data: event
        })
    } catch (error) {
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const events = await getEvents(req);
        res.status(StatusCodes.OK).json({
            data: events
        })
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const event = await findEvent(req);
        res.status(StatusCodes.OK).json({
            data: event
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const event = await updateEvent(req);
        res.status(StatusCodes.OK).json({
            data: event
        })
    } catch (error) {
       next(error) 
    }
}

const remove = async (req, res, next) => {
    try {
        const event = await deleteEvent(req);
        res.status(StatusCodes.OK).json({
            data: event
        })
    } catch (error) {
        next(error);        
    }
}

export { create, index, find, update, remove };