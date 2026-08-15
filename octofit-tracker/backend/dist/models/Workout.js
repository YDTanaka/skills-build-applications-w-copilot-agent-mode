import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    suggestedFor: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
