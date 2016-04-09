import { Router } from 'express';
import * as controller from '../controllers/user.controller';
const router = new Router();

router.route('/').get(controller.getUsers);

export default router;
