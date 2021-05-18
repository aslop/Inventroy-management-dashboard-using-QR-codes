import { Document } from 'mongoose';

export interface IItem extends Document {
  id: string;
  name: string;
  properties: any; //TODO
  users: [];
}
