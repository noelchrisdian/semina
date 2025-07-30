import { imageModel as Images } from "../../api/images/model.js";
import { NotFound } from "../../errors/not found.js";

const createImage = async (req) => {
    return await Images.create({
        name: req.file ?
            `uploads/${req.file.filename}` :
            'uploads/avatar/Default.webp'
    })
}

const checkImage = async (id) => {
    const image = await Images.findOne({ _id: id });

    if (!image) {
        throw new NotFound(`Image doesn't exist`);
    }

    return image;
}

export { createImage, checkImage };