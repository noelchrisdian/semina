import { BadRequest } from "../../errors/bad request.js";
import { categoryModel as Categories } from "../../api/categories/model.js";
import { NotFound } from "../../errors/not found.js";

const getCategories = async () => {
    return await Categories.find();
}

const createCategory = async (req) => {
    const { name } = req.body;
    const check = await Categories.findOne({ name });

    if (check) {
        throw new BadRequest('Category existed');
    }

    return await Categories.create({ name });
}

const findCategory = async (req) => {
    const { id } = req.params;

    const category = await Categories.findOne({ _id: id });

    if (!category) {
        throw new NotFound(`This category doesn't exist`);
    }

    return category;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const check = await Categories.findOne({ name, _id: { $ne: id } });

    if (check) {
        throw new BadRequest('Category existed');
    }

    return await Categories.findByIdAndUpdate(id, { name }, { runValidators: true, new: true });
}

const deleteCategory = async (req) => {
    const { id } = req.params;
    return await Categories.findByIdAndDelete(id);
}

export {
    getCategories,
    createCategory,
    findCategory,
    updateCategory,
    deleteCategory
}