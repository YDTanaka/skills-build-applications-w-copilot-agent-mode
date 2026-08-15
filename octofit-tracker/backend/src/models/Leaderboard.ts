import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: string;
  points: number;
  rank: number;
  team?: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
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
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
