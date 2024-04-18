import * as React from "react";
import useConversation from "../store/useConversation";
import useConversationProps from "../models/useConversation.model";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { messages, setMessages, selectedConversation } =
    useConversation() as useConversationProps;

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data.data.message]);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return { loading, sendMessage };
};

export default useSendMessage;
