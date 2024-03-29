import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export function Validator(schema: AnyZodObject) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
