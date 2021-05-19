import { Request, Response } from 'express';
import { User } from '../../models/User';
import { Item } from '../../models/Item';

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: res.locals.user.id });
    const item = await Item.findOne({ _id: id });

    if (!user) {
      res.status(401).send('unauthorized');
    }

    if (item.user == user.id) {
      console.log(item);
      res.send({
        id: item._id,
        name: item.name,
        amount: item.amount,
        properties: item.properties,
      });
    }
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default getOne;
