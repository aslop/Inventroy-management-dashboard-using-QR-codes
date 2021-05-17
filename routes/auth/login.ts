import { Request, Response } from 'express';
import { logUserIn, authorizeUser } from '../../utils/Auth/AuthUtils';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { isAuthorized, userId } = await authorizeUser(email, password);

    if (isAuthorized) {
      await logUserIn(userId, req, res);

      res.send({
        status: 'SUCCESS',
        userId,
      });
    } else {
      res.status(401).send({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'error' });
  }
};
