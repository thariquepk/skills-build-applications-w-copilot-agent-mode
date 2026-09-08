import mongoose, { Schema } from 'mongoose';

export const User = mongoose.model(
  'User',
  new Schema(
    {
      username: { type: String, required: true, unique: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      name: { type: String, trim: true },
      profile: { type: Schema.Types.Mixed },
    },
    { timestamps: true, versionKey: false },
  ),
);

export const Team = mongoose.model(
  'Team',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true, versionKey: false },
  ),
);

export const Activity = mongoose.model(
  'Activity',
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      type: { type: String, required: true, trim: true },
      duration: { type: Number, min: 0 },
      distance: { type: Number, min: 0 },
      points: { type: Number, min: 0, default: 0 },
      performedAt: { type: Date, default: Date.now },
    },
    { timestamps: true, versionKey: false },
  ),
);

export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
      points: { type: Number, min: 0, default: 0 },
      rank: { type: Number, min: 1 },
    },
    { timestamps: true, versionKey: false },
  ),
);

export const Workout = mongoose.model(
  'Workout',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      difficulty: { type: String, trim: true },
      exercises: [{ type: Schema.Types.Mixed }],
      suggestedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true, versionKey: false },
  ),
);
