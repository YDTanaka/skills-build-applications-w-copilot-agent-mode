import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    rank: {
        type: Number,
        required: true,
        default: 0,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
    },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
