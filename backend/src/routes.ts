import { Route as RouteType, RequestMethod } from "@imforked/legos/server";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

export const routes: RouteType[] = [
  {
    path: "/api/messages",
    method: RequestMethod.POST,

    requestHandler: async (req, res) => {
      try {
        const contentType = req.headers["content-type"];
        if (!contentType?.startsWith("audio/wav")) {
          return res
            .status(400)
            .json({ error: "Invalid content type. Expected audio/wav" });
        }

        if (!req.body || !Buffer.isBuffer(req.body)) {
          return res.status(400).json({ error: "No audio data received" });
        }

        const audioData = new Uint8Array(req.body);

        const message = await prisma.message.create({
          data: { audioData },
        });

        res.status(201).json({ id: message.id });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    },
  },
  {
    path: `/api/messages`,
    method: RequestMethod.GET,
    requestHandler: async (req, res) => {
      try {
        const messages = await prisma.message.findMany();

        const encodedMessages = messages.map((message) => ({
          id: message.id,
          createdAt: message.createdAt,
          audioData: Buffer.from(message.audioData).toString("base64"),
        }));

        res.json(encodedMessages);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
    },
  },
];
