import mongoose, { model, Schema } from "mongoose";

const ticketCategorySchema = Schema({
    type: {
        type: String,
        required: [true, `Ticket type is required`]
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    statusTicketCategory: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    expired: {
        type: Date
    }
})

const eventSchema = Schema({
    title: {
        type: String,
        required: [true, `Title is required`]
    },
    date: {
        type: Date,
        required: [true, `Date and time is required`]
    },
    about: {
        type: String
    },
    tagline: {
        type: String,
        required: [true, `Tagline is required`]
    },
    keyPoint: {
        type: String
    },
    venueName: {
        type: String,
        required: [true, `Venue name is required`]
    },
    statusEvent: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    tickets: {
        type: [ticketCategorySchema],
        required: true
    },
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    talent: {
        type: mongoose.Types.ObjectId,
        ref: 'Talent',
        required: true
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true
    }
}, { timestamps: true })

const eventModel = model('Event', eventSchema);

export { eventModel };