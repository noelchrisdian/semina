import { compare, hash } from "bcryptjs";
import { model, Schema } from "mongoose";

const participantSchema = Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: '-'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: true })

participantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 12); 
    }   
})

participantSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

const participantModel = model('Participant', participantSchema);

export { participantModel };