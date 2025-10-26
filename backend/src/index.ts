import { createServer } from "@imforked/legos/server";
import { routes } from "./routes.js";

if (process.env.NODE_ENV !== "production") {
  import("dotenv/config");
}

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
  console.log("Your env variables:");
  console.log(JSON.stringify(process.env, null, 2));
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
