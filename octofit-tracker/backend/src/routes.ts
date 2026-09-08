import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

function createCrudRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await model.find().sort({ createdAt: -1 }).lean();
    response.json(records);
  });

  router.post('/', async (request: Request, response: Response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

export const apiRouter = Router();
apiRouter.use('/users', createCrudRouter(User));
apiRouter.use('/teams', createCrudRouter(Team));
apiRouter.use('/activities', createCrudRouter(Activity));
apiRouter.use('/leaderboard', createCrudRouter(LeaderboardEntry));
apiRouter.use('/workouts', createCrudRouter(Workout));
