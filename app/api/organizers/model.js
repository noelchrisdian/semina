import { model, Schema } from "mongoose";

const organizerSchema = Schema({
    organizer: {
        type: String,
        required: [true, 'Organizer is required']
    }
}, { timestamps: true })

const organizerModel = model('Organizer', organizerSchema)

export { organizerModel };