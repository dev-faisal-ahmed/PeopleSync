import HTTP from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model';
import { AppError } from '../utils/app-error';
import { LoginValidationSchemaType } from '../validation';
import { jwtSecret } from '../config';

async function Login(payload: LoginValidationSchemaType) {
  const { email, password } = payload;

  // checking if user if there or nor
  const admin = await Admin.findOne({ email });
  if (!admin) throw new AppError('User not found', HTTP.NOT_FOUND);

  // if user found then check the password
  const { password: hashedPassword, _id } = admin.toObject();
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
  // password does not math
  if (!isPasswordMatched)
    throw new AppError('Password does not match', HTTP.FORBIDDEN);

  // if user password matched then generate the token
  const token = jwt.sign({ _id, email }, jwtSecret, { expiresIn: '30d' });
  return token;
}

export const AuthServices = { Login };
