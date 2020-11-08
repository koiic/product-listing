import AuthController from '../controllers/auth';
import express from 'express';
// import AuthController from '../controllers/auth'

export const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;
