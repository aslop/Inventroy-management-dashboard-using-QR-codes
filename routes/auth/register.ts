import { Request, Response } from 'express';
import { registerUser, logUserIn } from '../../utils/Auth/AuthUtils';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { id } = await registerUser(email, password);
    await logUserIn(id, req, res);
    res.send({
      status: 'SUCCESS',
      userId: id,
    });
  } catch (error) {
    // TODO add specific messages
    res.status(400).send({ error: 'error' });
  }
};
