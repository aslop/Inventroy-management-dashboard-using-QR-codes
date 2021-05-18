import { Request, Response } from 'express';
import { User } from '../../models/User';

const getAll = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: res.locals.user.id });
    const { items } = await user.populate('items').execPopulate();

    if (!user) {
      res.status(401).send('unauthorized');
    }

    res.send(
      items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          properties: item.properties,
        };
      })
    );
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default getAll;
