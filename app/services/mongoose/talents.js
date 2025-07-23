import { BadRequest } from '../../errors/bad request.js';
import { checkingImage } from './images.js';
import { NotFound } from '../../errors/not found.js';
import { talentModel as Talents } from '../../api/talents/model.js';

const getTalents = async (req) => {
    const { keyword } = req.query;

    let condition = {};

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
    }

    return await Talents.find(condition)
        .populate({
            path: 'image',
            select: '_id name'
        }).select('_id name role image')
}

const createTalent = async (req) => {
    const { name, role, image } = req.body;

    await checkingImage(image);
    
    const check = await Talents.findOne({ name });

    if (check) {
        throw new BadRequest(`Talent existed`);
    }

    return await Talents.create({ name, role, image });
}

const findTalent = async (req) => {
    const { id } = req.params;

    const talent = await Talents.findOne({ _id: id })
        .populate({
            path: 'image',
            select: '_id name'
        })
        .select('_id name role image')
    
    if (!talent) {
        throw new NotFound(`This talent doesn't exist`);
    }

    return talent;
}

const updateTalent = async (req) => {
    const { id } = req.params;
    const { name, role, image } = req.body;

    await checkingImage(image);

    const check = await Talents.findOne({ name, _id: { $ne: id } });
    if (check) {
        throw new BadRequest(`Talent existed`);
    }

    const talent = await Talents.findByIdAndUpdate(id, { name, role, image }, { runValidators: true, new: true });

    if (!talent) {
        throw new NotFound(`This talent doesn't exist`);
    }

    return talent;
}

const deleteTalent = async (req) => {
    const { id } = req.params;
    const talent = await Talents.findOne({ _id: id });

    if (!talent) {
        throw new NotFound(`This talent doesn't exist`);
    }

    await talent.remove();
    return talent;
}

const checkingTalent = async (id) => {
    const talent = await Talents.findOne({ _id: id });

    if (!talent) {
        throw new NotFound(`This talent doesn't exist`);
    }

    return talent;
}

export {
    getTalents,
    createTalent,
    findTalent,
    updateTalent,
    deleteTalent,
    checkingTalent
}