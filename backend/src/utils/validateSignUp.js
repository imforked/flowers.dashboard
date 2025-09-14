// @ts-check

import { SignUpSchema } from "@imforked/legos/server";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {(err?: any) => void} next
 */
export const validateSignUp = (req, res, next) => {
  const validationResult = SignUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    /** @type {Record<string, string>} */
    const fieldErrors = {};

    for (const issue of validationResult.error.issues) {
      const pathSegment = issue.path[0];
      if (typeof pathSegment === "string" && !fieldErrors[pathSegment]) {
        fieldErrors[pathSegment] = issue.message;
      }
    }

    return res.status(400).json({ errors: fieldErrors });
  }

  req.body = validationResult.data;
  next();
};
