import { categoryModel } from "./model.js";

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await categoryModel.create({ name });
        res.status(201).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            data: categories
        })
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findOne({ _id: id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        /*
        const category = await categoryModel.findOne({ _id: id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;
        await category.save();
        */
        
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name },
            { runValidators: true, new: true }
        )

        res.status(200).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Category has been deleted',
            data: category,
        })
    } catch (error) {
        next(error);
    }
}

export { create, index, find, update, remove };