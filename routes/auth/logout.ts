import { Request, Response } from 'express';
import { logUserOut } from '../../utils/Auth/AuthUtils';

export const logout = async (req: Request, res: Response) => {
  try {
    await logUserOut(req, res);

    res.send({
      data: 'user logged out',
    });
  } catch (e) {
    console.error(e);
  }
};
