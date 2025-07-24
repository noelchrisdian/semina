import mongoose, { model, Schema } from "mongoose";
import { compare, hash } from "bcryptjs";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, `Name is required`],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, `Email is required`]
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'owner'],
        default: 'admin'
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 12);
    }

    next()
})

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

const userModel = model('User', userSchema)

export { userModel };