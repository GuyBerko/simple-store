import { model, Schema } from 'mongoose';
import { UserDoc, UserModel } from '../types/users';

const UserSchema = new Schema<UserDoc, UserModel>({
  name: {
    type: String,
  },
});

const User = model<UserDoc, UserModel>('User', UserSchema);

export { User };
