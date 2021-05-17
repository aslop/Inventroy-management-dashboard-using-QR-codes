import { model, Schema, Document } from 'mongoose';
import { IUser } from '../types/User';
import { genSalt, hash } from 'bcryptjs';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ['admin', 'operator'],
    required: true,
  },
});

userSchema.methods.hashPassword = async function (password: string) {
  try {
    const salt = await genSalt(10);
    return hash(password, salt);
  } catch (error) {
    return error;
  }
};

const User = model<IUser & Document>('User', userSchema);

export { User };
