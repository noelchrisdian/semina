import { BadRequest } from "../../errors/bad request.js";
import { categoryModel as Categories } from "../../api/categories/model.js";
import { NotFound } from "../../errors/not found.js";

const getCategories = async (req) => {
    return await Categories.find({ organizer: req.user.organizer });
}

const createCategory = async (req) => {
    const { name } = req.body;
    const check = await Categories.findOne({ name, organizer: req.user.organizer });

    if (check) {
        throw new BadRequest('Category existed');
    }

    return await Categories.create({ name, organizer: req.user.organizer });
}

const findCategory = async (req) => {
    const { id } = req.params;

    const category = await Categories.findOne({ _id: id, organizer: req.user.organizer });

    if (!category) {
        throw new NotFound(`This category doesn't exist`);
    }

    return category;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const check = await Categories.findOne({
        name,
        _id: { $ne: id },
        organizer: req.user.organizer
    })

    if (check) {
        throw new BadRequest('Category existed');
    }

    return await Categories.findByIdAndUpdate(id, { name }, { runValidators: true, new: true });
}

const deleteCategory = async (req) => {
    const { id } = req.params;
    const category = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer
    })

    if (!category) {
        throw new NotFound(`This category doesn't exist`);
    }

    await category.remove();
    return category;
}

const checkingCategory = async (id) => {
    const category = await Categories.findOne({ _id: id });
    if (!category) {
        throw new NotFound(`This category doesn't exist`);
    }

    return category;
}

export {
    getCategories,
    createCategory,
    findCategory,
    updateCategory,
    deleteCategory,
    checkingCategory
}