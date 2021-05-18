import { Request, Response } from 'express';
import { Item } from '../../models/Item';

const create = async (req: Request, res: Response) => {
  try {
    const { name, properties } = req.body;

    const newItem = new Item({
      name,
      properties,
    });

    await newItem.save();

    res.send({ item: newItem });
  } catch (error) {
    res.status(500).send('server error');
  }
};

export default create;
