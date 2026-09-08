import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        name: 'Maya Chen',
        profile: { goal: 'Build endurance', level: 'intermediate' },
      },
      {
        username: 'liam-rivera',
        email: 'liam.rivera@example.com',
        name: 'Liam Rivera',
        profile: { goal: 'Improve strength', level: 'beginner' },
      },
      {
        username: 'sofia-patel',
        email: 'sofia.patel@example.com',
        name: 'Sofia Patel',
        profile: { goal: 'Run a 10K', level: 'advanced' },
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on consistent running progress.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Core Catalysts',
        description: 'Strength and mobility training for every fitness level.',
        members: [users[1]._id],
      },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', duration: 35, distance: 5.2, points: 52 },
      { userId: users[1]._id, type: 'strength', duration: 45, points: 45 },
      { userId: users[2]._id, type: 'cycling', duration: 50, distance: 18.4, points: 74 },
    ]);

    await LeaderboardEntry.create([
      { userId: users[2]._id, teamId: teams[0]._id, points: 740, rank: 1 },
      { userId: users[0]._id, teamId: teams[0]._id, points: 620, rank: 2 },
      { userId: users[1]._id, teamId: teams[1]._id, points: 450, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Full-Body Foundation',
        description: 'A balanced session combining strength and mobility.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Push-up', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
        suggestedFor: [users[1]._id],
      },
      {
        name: 'Endurance Builder',
        description: 'Intervals designed to improve aerobic capacity.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Easy run', durationMinutes: 10 },
          { name: 'Fast interval', durationMinutes: 3, repeats: 5 },
          { name: 'Cool down', durationMinutes: 8 },
        ],
        suggestedFor: [users[0]._id, users[2]._id],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
