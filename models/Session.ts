import { model, Schema, Document } from 'mongoose';
import { ISession } from '../types/Session';

const sessionSchema = new Schema<ISession>({
  userId: {
    type: String,
    required: true,
  },

  sessionToken: {
    type: String,
    required: true,
  },

  valid: {
    type: Boolean,
    required: true,
  },

  userAgent: {
    type: String,
    required: true,
  },
});

const Session = model<ISession & Document>('Session', sessionSchema);

export { Session };
