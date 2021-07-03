import { Router } from 'express';

import AuthController from './auth.controller';

const router = Router();

router.route('/login').post(AuthController.logIn);

export default router;
