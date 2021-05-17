import { Router } from 'express';
const router: Router = Router();
import auth from './auth/index';

//
import { getUserFromCookies } from '../utils/Auth/AuthUtils';
//
router.use('/api/auth', auth);

router.get('/shouldBeAuthed', async (req, res) => {
  const user = await getUserFromCookies(req, res);

  if (user) {
    res.status(200).send({ user });
  } else {
    res.status(401).send('not authorized');
  }
});

export default router;
