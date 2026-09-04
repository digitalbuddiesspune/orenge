import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

type Target = 'body' | 'query' | 'params';

export function validate(schema: ZodSchema, target: Target = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten(),
      });
      return;
    }
    req[target] = result.data;
    next();
  };
}
