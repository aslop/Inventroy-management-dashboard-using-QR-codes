import { Router } from 'express';
const router: Router = Router();

// Controllers
import create from './create';
import getAll from './getAll';

router.post('/', create);
router.get('/', getAll);

export default router;
