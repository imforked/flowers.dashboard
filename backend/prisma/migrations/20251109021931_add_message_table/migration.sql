-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "audioData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
