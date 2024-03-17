import { AuthServices } from '../services/auth.services';
import { SendSuccessResponse } from '../utils/response-helper';
import { TryCatch } from '../utils/try-catch';

const Login = TryCatch(async (req, res) => {
  const token = await AuthServices.Login(req.body);
  return SendSuccessResponse(res, {
    message: 'Logged In Successfully',
    data: { token },
    status: 200,
  });
});

export const AuthController = { Login };
