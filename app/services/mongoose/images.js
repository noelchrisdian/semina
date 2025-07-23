import { imageModel as Images } from "../../api/images/model.js";

const createImage = async (req) => {
    return await Images.create({
        name: req.file ?
            `uploads/${req.file.filename}` :
            'uploads/avatar/Default.webp'
    })
}

export { createImage };