import {
  Route,
  RequestMethod,
  verifyRecaptcha,
  ExpectedAction,
} from "@imforked/legos/server";
import { validateSignUp } from "./utils/validateSignUp.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

export const routes: Route[] = [
  {
    path: "/signup",
    method: RequestMethod.POST,
    requestHandler: async (req, res, next) => {
      try {
        // Validate form fields
        validateSignUp(req, res, (err?: any) => {
          if (err) return next(err);
        });

        // Verify reCAPTCHA
        const { recaptchaToken, firstName, lastName, email, password } =
          req.body;

        const recaptchaOk = await verifyRecaptcha({
          projectID: process.env.GCP_PROJECT_ID!,
          recaptchaKey: process.env.RECAPTCHA_SITE_KEY!,
          token: recaptchaToken,
          expectedAction: ExpectedAction.SignUp,
        });

        if (!recaptchaOk) {
          return res.status(400).json({ error: "Invalid reCAPTCHA token" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user in the database
        const user = await prisma.user.create({
          data: { firstName, lastName, email, passwordHash },
        });

        res.json({ user });
      } catch (err) {
        next(err);
      }
    },
  },
];
