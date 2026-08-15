import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['running', 'walking', 'strength'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
    },
    calories: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
