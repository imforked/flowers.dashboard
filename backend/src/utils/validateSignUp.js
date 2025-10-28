// @ts-check

import { SignUpSchema } from "@imforked/legos/server";

/**
 * Validates the signup form.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {boolean} true if validation failed, false if successful
 */
export const validateSignUp = (req, res) => {
  // Parse and validate the request body using Zod schema
  const validationResult = SignUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    /** @type {Record<string, string>} */
    const fieldErrors = {};

    // Iterate over each validation issue
    for (const issue of validationResult.error.issues) {
      const pathSegment = issue.path[0];
      if (typeof pathSegment === "string" && !fieldErrors[pathSegment]) {
        fieldErrors[pathSegment] = issue.message; // Assign error message to the field
      }
    }

    // Send validation errors to the client
    res.status(400).json({ errors: fieldErrors });
    return true; // validation failed
  }

  // Replace request body with validated data
  req.body = validationResult.data;
  return false; // validation succeeded
};
