import { Router } from 'express';
const router: Router = Router();

// Controllers
import create from './create';
import getAll from './getAll';
import getOne from './getOne';
import scan from './scan';

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/scan/:id', scan);

export default router;
