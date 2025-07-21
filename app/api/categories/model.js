import { model, Schema } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Category name must contain at least 3 characters'],
        maxlength: [20, `Category name can't exceed 20 characters`],
        required: [true, 'Category name is required']
    }
}, { timestamps: true }
)

const categoryModel = model('Category', categorySchema);

export { categoryModel };