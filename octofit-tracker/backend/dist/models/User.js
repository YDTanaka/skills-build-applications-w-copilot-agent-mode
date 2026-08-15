import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
