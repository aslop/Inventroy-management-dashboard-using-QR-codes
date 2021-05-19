import { Request, Response } from 'express';
import { User } from '../../models/User';
import { Item } from '../../models/Item';

const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: res.locals.user.id });
    const item = await Item.findOne({ _id: id });

    if (!user) {
      res.status(401).send('unauthorized');
    }

    if (item.user == user.id) {
      await Item.findOneAndDelete({ _id: id });

      user.items = user.items.filter((e: string) => {
        return e != id;
      });

      await user.save();

      res.status(200).send('ok');
    }
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default deleteOne;
