import { Router } from 'express';
const router: Router = Router();

// Controllers
import create from './create';

router.post('/', create);

export default router;
