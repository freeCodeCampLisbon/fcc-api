import express from 'express';
import Requests from './requests'
import {NewsletterController, MeetupController} from './controllers'

const router = express.Router();

export function routes(app: any) {

  router.post('/newsletter', Requests.NewsletterRequest, NewsletterController.index)
  router.post('/reserve-seat', Requests.MeetupRequest, MeetupController.store)

  router.get('/test', (req, res) => res.json('Welcome to FCC Lx API'))

  app.use('/api', router);
};