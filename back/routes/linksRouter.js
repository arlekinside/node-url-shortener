import connectEnsureLogin from 'connect-ensure-login';
import express from 'express';

import * as LinksController from '../controllers/linksController.js';

const router = express.Router();

router.get('/', connectEnsureLogin.ensureLoggedIn(), LinksController.getAll);

router.get('/:code', connectEnsureLogin.ensureLoggedIn(), LinksController.get);

router.post('/', connectEnsureLogin.ensureLoggedIn(), LinksController.save);

router.put('/:code', connectEnsureLogin.ensureLoggedIn(), LinksController.update);

router.delete('/:code', connectEnsureLogin.ensureLoggedIn(), LinksController.del);

router.get('/redirect/:code', LinksController.redirect);

export default router;