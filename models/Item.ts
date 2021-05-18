import { model, Schema, Document } from 'mongoose';
import { IItem } from '../types/Item';

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    properties: Schema.Types.Mixed,
  },
  { strict: false }
);

const Item = model<IItem & Document>('Item', itemSchema);

export { Item };
