import {
  createServer,
  RequestMethod,
  type Route,
} from "@imforked/legos/server";
// import { validateSignUp } from "./utils/validateSignUp.js";

const routes: Route[] = [
  {
    path: "/",
    method: RequestMethod.POST,
    requestHandler: (req, res, next) => {
      // validateSignUp(req, res, (err?: any) => {
      //   if (err) return next(err);

      //   console.log("📩 Received body:", req.body);
      //   res.json({ youSent: req.body });
      // });
      console.log("📩 Received body:", req.body);
      res.json({ youSent: req.body });
    },
  },
];

// Create and configure the server
const app = createServer({
  // TODO: add CORS options
  routes,
  // middleware: [validateSignUp],
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
