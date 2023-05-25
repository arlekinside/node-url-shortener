import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';

import * as UserController from '../controllers/usersController.js';

const router = express.Router();

router.get('/', connectEnsureLogin.ensureLoggedIn(), UserController.getAll);

router.get('/:id', connectEnsureLogin.ensureLoggedIn(), UserController.get);

router.post('/', UserController.save);

router.put('/:id', connectEnsureLogin.ensureLoggedIn(), UserController.update);

router.delete('/:id', connectEnsureLogin.ensureLoggedIn(), UserController.del);

export default router;