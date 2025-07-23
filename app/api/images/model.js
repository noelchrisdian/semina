import { model, Schema } from "mongoose";

const imageSchema = Schema({
    name: { type: String }
}, { timestamps: true })

const imageModel = model('Image', imageSchema);

export { imageModel };