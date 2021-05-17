import { Document } from 'mongoose';

export interface ISession extends Document {
  id: string;
  sessionToken: string;
  userId: string;
  valid: boolean;
  userAgent: string;
}
