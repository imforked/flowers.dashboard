import {
  createServer,
  RequestMethod,
  type Route,
} from "@imforked/legos/server";

const routes: Route[] = [
  {
    path: "/",
    method: RequestMethod.POST,
    requestHandler: (req, res) => {
      console.log("📩 Received body:", req.body);
      res.json({ youSent: req.body });
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
