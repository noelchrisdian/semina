import { checkingCategory } from "./categories.js";
import { checkingImage } from "./images.js";
import { checkingTalent } from "./talents.js";
import { BadRequest } from '../../errors/bad request.js';
import { eventModel as Events } from "../../api/events/model.js";
import { NotFound } from "../../errors/not found.js";

const getEvents = async (req) => {
    const { keyword, category, talent } = req.query;
    let condition = {};

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    }

    if (category) {
        condition = { ...condition, category };
    }

    if (talent) {
        condition = { ...condition, talent };
    }

    return await Events.find(condition)
        .populate({ path: 'image', select: '_id name' })
        .populate({ path: 'category', select: '_id name' })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' }
        })
}

const createEvent = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body;

    await checkingImage(image);
    await checkingCategory(category);
    await checkingTalent(talent);

    const check = await Events.findOne({ title });

    if (check) {
        throw new BadRequest(`This title is existed`);
    }

    return await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    });
}

const findEvent = async (req) => {
    const { id } = req.params;

    const event = await Events.findOne({ _id: id })
        .populate({ path: 'image', select: '_id name' })
        .populate({ path: 'category', select: '_id name' })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' }
        })

    if (!event) {
        throw new NotFound(`This event doesn't exist`);
    }

    return event
}

const updateEvent = async (req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body;

    await checkingImage(image);
    await checkingCategory(category);
    await checkingTalent(talent);

    const checkEvent = await Events.findOne({ _id: id });
    if (!checkEvent) {
        throw new NotFound(`This event doesn't exist`);
    }

    const check = await Events.findOne({ title, _id: { $ne: id } });
    if (check) {
        throw new BadRequest(`This title is existed`);
    }
    
    return await Events.findByIdAndUpdate(
    id,
    {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    },
    { runValidators: true, new: true });
}

const deleteEvent = async (req) => {
    const { id } = req.params;
    const event = await Events.findOne({ _id: id });
    
    if (!event) {
        throw new NotFound(`This event doesn't exist`);
    }

    await event.remove();
    return event;
}

export {
    getEvents,
    createEvent,
    findEvent,
    updateEvent,
    deleteEvent
}