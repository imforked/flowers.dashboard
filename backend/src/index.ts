import { createServer } from "@imforked/legos/server";
import { routes } from "./routes.js";

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
