import { Request, Response } from 'express';
import { User } from '../../models/User';
import { Item } from '../../models/Item';

const scan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { action, amount } = req.body;

    if (!action || !amount || !id) {
      res.status(400).send('missing params');
    }

    const user = await User.findOne({ _id: res.locals.user.id });
    const item = await Item.findOne({ _id: id });

    if (!user) {
      res.status(401).send('unauthorized');
    }

    if (!item) {
      res.status(400).send('invalid id');
    }

    if (item.user == user.id) {
      switch (action) {
        case 'add':
          item.amount += amount;
          await item.save();

          res.send({
            id: item._id,
            name: item.name,
            amount: item.amount,
            properties: item.properties,
          });

          break;

        case 'remove':
          if (item.amount - amount >= 0) {
            item.amount -= amount;
            await item.save();

            res.send({
              id: item._id,
              name: item.name,
              amount: item.amount,
              properties: item.properties,
            });
          } else {
            res.send('Not enough in stock');
          }

          break;

        default:
          break;
      }
    }
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default scan;
