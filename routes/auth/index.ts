import { Router } from 'express';
const router: Router = Router();

import { logout } from './logout';
import { login } from './login';
import { register } from './register';

router.post('/logout', logout);
router.post('/login', login);
router.post('/register', register);

export default router;
