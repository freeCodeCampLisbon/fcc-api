import express from 'express';
import NameController from './controllers/NameController';

const router = express.Router();

export function routes(app: any) {
  app.use('/api/name', NameController);
  router.get('/test', (req, res) => res.json('yooo'));

  app.use('/api', router);
};