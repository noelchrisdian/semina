import { checkCategory } from "./categories.js";
import { checkImage } from "./images.js";
import { checkTalent } from "./talents.js";
import { BadRequest } from '../../errors/bad request.js';
import { eventModel as Events } from "../../api/events/model.js";
import { NotFound } from "../../errors/not found.js";

const getEvents = async (req) => {
    const { keyword, category, talent, status } = req.query;
    let condition = { organizer: req.user.organizer };

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    }

    if (category) {
        condition = { ...condition, category };
    }

    if (talent) {
        condition = { ...condition, talent };
    }

    if (talent) {
        condition = { ...condition, talent };
    }

    if (['Draft', 'Published'].includes(status)) {
        condition = { ...condition, statusEvent: status };
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

    await checkImage(image);
    await checkCategory(category);
    await checkTalent(talent);

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
        talent,
        organizer: req.user.organizer
    })
}

const findEvent = async (req) => {
    const { id } = req.params;

    const event = await Events.findOne({ _id: id, organizer: req.user.organizer })
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

    return event;
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

    await checkImage(image);
    await checkCategory(category);
    await checkTalent(talent);

    const checkEvent = await Events.findOne({ _id: id });
    if (!checkEvent) {
        throw new NotFound(`This event doesn't exist`);
    }

    const check = await Events.findOne({
        title,
        _id: { $ne: id },
        organizer: req.user.organizer
    })

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
        talent, 
        organizer: req.user.organizer
    },
    { runValidators: true, new: true });
}

const deleteEvent = async (req) => {
    const { id } = req.params;
    const event = await Events.findOne({ _id: id, organizer: req.user.organizer });
    
    if (!event) {
        throw new NotFound(`This event doesn't exist`);
    }

    await event.remove();
    return event;
}

const changeStatusEvent = async (req) => {
    const { id } = req.params;
    const { statusEvent } = req.body;

    if (!['Draft', 'Published'].includes(statusEvent)) {
        throw new BadRequest(`Status is either Draft or Published`)
    }

    const event = await Events.findOneAndUpdate(
        { _id: id, organizer: req.user.organizer },
        { $set: { statusEvent } },
        { new: true, runValidators: true }
    )

    if (!event) {
        throw new NotFound(`This event doesn't exist`);
    }

    return event;
}

export {
    getEvents,
    changeStatusEvent,
    createEvent,
    findEvent,
    updateEvent,
    deleteEvent
}