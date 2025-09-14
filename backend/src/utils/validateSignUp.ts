import type { RequestHandler } from 'express';
import { SignUpSchema } from '@imforked/legos/server';

export const validateSignUp: RequestHandler = (req, res, next) => {
  const validationResult = SignUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of validationResult.error.issues) {
      const pathSegment = issue.path[0];
      if (typeof pathSegment === 'string' && !fieldErrors[pathSegment]) {
        fieldErrors[pathSegment] = issue.message;
      }
    }

    return res.status(400).json({ errors: fieldErrors });
  }

  req.body = validationResult.data;
  next();
};
