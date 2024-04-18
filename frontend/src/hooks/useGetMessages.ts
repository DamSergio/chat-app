import * as React from "react";
import useConversationProps from "../models/useConversation.model";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = React.useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversation() as useConversationProps;

  React.useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${selectedConversation?._id}`
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data.data.messages);
      } catch (error) {
        toast.error((error as Error).message);
      }
      setLoading(false);
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
