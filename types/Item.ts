import { Document } from 'mongoose';

export interface IItem extends Document {
  id: string;
  properties: any; //TODO
}
