import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  cartItems: Array<{
    quantity: number;
    product: string; // يمكن أن يكون ObjectId أيضًا
  }>;
  resetPasswordToken?: any;
  resetPasswordExpiresAt?: any;
  verificationToken?: any;
  verificationTokenExpiresAt?: any;
}
