import {
  createServer,
  RequestMethod,
  verifyRecaptcha,
  ExpectedAction,
  type Route,
} from "@imforked/legos/server";
import { validateSignUp } from "./utils/validateSignUp.js";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const routes: Route[] = [
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

        // Create user in the database (Prisma example)
        const user = await prisma.user.create({
          data: { firstName, lastName, email, passwordHash: password },
        });

        res.json({ user });
      } catch (err) {
        next(err);
      }
    },
  },
];

// Create and configure the server
const app = createServer({
  // TODO: add CORS options
  routes,
  onError: (err) => {
    console.error("Custom error handler:", err);
    return { status: 500, body: { error: "Something went wrong." } };
  },
});

// Start listening
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
