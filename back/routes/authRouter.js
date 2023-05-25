import express from 'express';
import * as AuthController from '../controllers/authController.js';
import passport from "passport";
import connectEnsureLogin from 'connect-ensure-login';

const router = express.Router();

router.post('/login', passport.authenticate('local'), AuthController.login);

router.get('/logout', connectEnsureLogin.ensureLoggedIn(), AuthController.logout);

export default router;