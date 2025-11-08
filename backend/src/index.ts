import "dotenv/config";
import { createServer } from "@imforked/legos/server";
import { routes } from "./routes.js";
import express from "express";

// Create and configure the server
const app = createServer({
  middleware: [
    // JSON middleware for normal routes
    express.json(),
    // `.raw` middleware only for audio/wav requests
    express.raw({ type: "audio/wav", limit: "20mb" }),
  ],
  routes,
  onError: (err) => {
    console.error("Custom error handler:", err);
    return { status: 500, body: { error: "Something went wrong." } };
  },
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
