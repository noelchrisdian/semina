import mongoose, { model, Schema } from "mongoose";

const paymentSchema = Schema({
    type: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Payment method is required']
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: true
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

const paymentModel = model('Payment', paymentSchema)

export { paymentModel };