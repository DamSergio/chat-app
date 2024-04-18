import * as React from "react";
import MessageModel from "../../models/message.model";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import useConversationProps from "../../models/useConversation.model";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }: { message: MessageModel }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation() as useConversationProps;

  const fromMe = message.senderId === authUser._id;
  const proficePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const chatBubbleColor = fromMe ? "bg-blue-500" : "bg-gray-500";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.isNew ? "shake" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={proficePic} alt="Tailwind CSS chat bubble component" />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${chatBubbleColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
