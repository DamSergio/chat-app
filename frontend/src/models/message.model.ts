interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  isNew: boolean | undefined;
}

export default Message;
