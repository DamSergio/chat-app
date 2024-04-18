import Conversation from "./conversation.model";
import Message from "./message.model";

interface useConversationProps {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export default useConversationProps;
