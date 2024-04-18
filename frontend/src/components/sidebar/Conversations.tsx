import * as React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import ConversationModel from "../../models/conversation.model";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flax flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto" />
      ) : (
        conversations.map((conversation: ConversationModel, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
