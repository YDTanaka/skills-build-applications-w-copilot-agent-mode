import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: 'running' | 'walking' | 'strength';
  duration: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
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
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
