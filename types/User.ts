import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'client';
  hashPassword: (password: string) => Promise<string>;
}
