import { Router } from 'express';
import * as controller from '../controllers/topic.controller';
const router = new Router();

router.route('/').get(controller.getTopics);

export default router;
