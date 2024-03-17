import jwt from 'jsonwebtoken';
import HTTP from 'http-status-codes';
import { jwtSecret } from '../config';
import { AppError } from '../utils/app-error';
import { TryCatch } from '../utils/try-catch';
import { Admin } from '../models/admin.model';

export function AuthGuard() {
  return TryCatch(async (req, _, next) => {
    const token = req.headers.authorization;

    // if no token provided
    if (!token) throw new AppError('Unauthorized', 401);

    const decodedUser = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const { _id } = decodedUser;
    const user = await Admin.findById(_id);

    if (!user) throw new AppError('User not found', HTTP.NOT_FOUND);
    next();
  });
}
