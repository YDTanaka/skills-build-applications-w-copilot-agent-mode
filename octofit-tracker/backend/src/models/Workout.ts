import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  suggestedFor?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
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
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
