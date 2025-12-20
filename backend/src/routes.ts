import { Route as RouteType, RequestMethod } from "@imforked/legos/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PI_URL = process.env.PI_URL;

if (!PI_URL) {
  throw new Error("PI_URL is not defined in environment variables");
}

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

        // Save message to the PostgreSQL database
        const message = await prisma.message.create({
          data: { audioData },
        });

        // WEBHOOK LOGIC
        // POST message to the Pi
        (async () => {
          try {
            await fetch(`${PI_URL}/new-message`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: message.id,
                createdAt: message.createdAt,
                audioData: Buffer.from(audioData).toString("base64"),
              }),
            });
            console.log(
              `Message with id of "${message.id}" has been posted to the Pi`
            );
          } catch (webhookErr) {
            console.error(`Failed to send message to the Pi: ${webhookErr}`);
          }
        })();

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
  {
    path: "/api/messages/latest",
    method: RequestMethod.GET,
    requestHandler: async (req, res) => {
      try {
        const latestMessage = await prisma.message.findFirst({
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!latestMessage) {
          return res
            .status(500)
            .json({ error: "Failed to fetch the latest message" });
        }

        const encodedMessage = {
          id: latestMessage.id,
          createdAt: latestMessage.createdAt,
          audioData: Buffer.from(latestMessage.audioData).toString("base64"),
        };

        res.json(encodedMessage);
      } catch (err) {
        console.error("Error fetching latest message:", err);
        res.status(500).json({ error: "Failed to fetch the latest message" });
      }
    },
  },
];
