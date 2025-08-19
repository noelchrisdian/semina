import mongoose, { model, Schema } from "mongoose";

const refreshTokenSchema = Schema({
    refreshToken: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const refreshTokenModel = model('RefreshToken', refreshTokenSchema);

export { refreshTokenModel };