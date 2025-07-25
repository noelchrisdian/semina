import { StatusCodes } from "http-status-codes";
import { createCategory, deleteCategory, findCategory, getCategories, updateCategory } from "../../services/mongoose/categories.js";

const create = async (req, res, next) => {
    try {
        const category = await createCategory(req);
        res.status(StatusCodes.CREATED).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const categories = await getCategories(req);
        res.status(StatusCodes.OK).json({
            data: categories
        })
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const category = await findCategory(req);

        res.status(StatusCodes.OK).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {

        /*
        const category = await Categories.findOne({ _id: id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;
        await category.save();
        */
        
        const category = await updateCategory(req);

        res.status(StatusCodes.OK).json({
            data: category
        })
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const category = await deleteCategory(req);
        res.status(StatusCodes.OK).json({
            message: 'Category has been deleted',
            data: category,
        })
    } catch (error) {
        next(error);
    }
}

export { create, index, find, update, remove };