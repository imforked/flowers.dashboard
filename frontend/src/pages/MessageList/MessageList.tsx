import { useEffect, useState } from "react";
import type { Message } from "./MessageList.types";

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  console.log(messages);

  return (
    <div>
      {messages.map((message, index) => (
        <h2>
          {index + 1}. {message.id}
        </h2>
      ))}
    </div>
  );
};
