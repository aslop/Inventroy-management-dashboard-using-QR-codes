import { Request, Response } from 'express';
import { Item } from '../../models/Item';
import { User } from '../../models/User';

const create = async (req: Request, res: Response) => {
  try {
    console.log('Posting on item');
    console.log(req.body);
    console.log('Posting on item');

    const { name, amount, properties } = req.body;

    const user = await User.findOne({ _id: res.locals.user.id });

    if (!user) {
      res.status(401).send('unauthorized');
    }

    const newItem = new Item({
      name,
      amount,
      properties,
      user: user.id,
    });

    await newItem.save();

    user.items.push(newItem.id);
    await user.save();

    res.send({
      item: {
        id: newItem._id,
        name: newItem.name,
        properties: newItem.properties,
      },
    });
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default create;
