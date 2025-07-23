import { StatusCodes } from "http-status-codes";
import { createTalent, deleteTalent, findTalent, getTalents, updateTalent } from "../../services/mongoose/talents.js";

const create = async (req, res, next) => {
    try {
        const talent = await createTalent(req);
        res.status(StatusCodes.CREATED).json({
            data: talent
        })
    } catch (error) {
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const talents = await getTalents(req);
        res.status(StatusCodes.OK).json({
            data: talents
        })
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const talent = await findTalent(req);
        res.status(StatusCodes.OK).json({
            data: talent
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const talent = await updateTalent(req);

        res.status(StatusCodes.OK).json({
            data: talent
        })
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const talent = await deleteTalent(req);
        res.status(StatusCodes.OK).json({
            message: 'Talent has been deleted',
            data: talent,
        })
    } catch (error) {
        next(error);
    }
}

export { create, index, find, update, remove };