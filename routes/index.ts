import { Router, Request, Response } from 'express';
const router: Router = Router();
import auth from './auth/index';
import items from './items/index';
import isUserAuthed from '../middlewares/isUserAuthed';

router.use('/api/auth', auth);
router.use('/api/items', isUserAuthed, items);

router.get('/shouldBeAuthed', isUserAuthed, async (req: Request, res: Response) => {
  const { user } = res.locals;

  if (user) {
    res.status(200).send({ user });
  } else {
    res.status(401).send('not authorized');
  }
});

export default router;
