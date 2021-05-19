import { Router } from 'express';
const router: Router = Router();

// Controllers
import create from './create';
import getAll from './getAll';
import getOne from './getOne';

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);

export default router;
