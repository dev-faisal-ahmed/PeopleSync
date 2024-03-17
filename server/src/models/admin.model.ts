import { Schema, model } from 'mongoose';
import { AdminType } from '../interfaces/admin.interface';

const AdminSchema = new Schema<AdminType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = model('admin', AdminSchema);
