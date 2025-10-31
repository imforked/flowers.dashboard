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
        const validationError = validateSignUp(req, res);
        if (validationError) return;

        // Verify reCAPTCHA
        const { recaptchaToken, firstName, lastName, email, password } =
          req.body;

        console.log("Received signup request:", req.body);

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

        const normalizedEmail = email.trim().toLowerCase();

        const user = await prisma.user.create({
          data: { firstName, lastName, email: normalizedEmail, passwordHash },
        });

        console.log("✅ New user created:", {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        });

        // Remove hashed password from client
        const { passwordHash: _, ...userSafe } = user;
        res.json({ user: userSafe });
      } catch (err: any) {
        if (err.code === "P2002" && err.meta?.target?.includes("email")) {
          return res.status(400).json({ error: "Email already in use" });
        }
        throw err;
      }
    },
  },
];
