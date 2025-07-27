import mongoose, { model, Schema } from "mongoose";

const talentSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    role: {
        type: String,
        default: '-'
    },
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true
    }
}, { timestamps: true })

const talentModel = model('Talent', talentSchema);

export { talentModel };