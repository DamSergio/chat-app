import * as React from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

import type useConversationProps from "../models/useConversation.model";
import type MessageModel from "../models/message.model";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation() as useConversationProps;

  React.useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageModel) => {
      newMessage.isNew = true;

      const sound = new Audio(notificationSound);
      sound.play();

      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
