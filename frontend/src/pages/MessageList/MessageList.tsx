import { useEffect, useState } from "react";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

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
