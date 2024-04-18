import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run in parallel

    // SOCKET IO FUNCTIONALITY
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // send the message to the receiver: io.to(receiverSocketId).emit("event", data) used to emit an event to a specific client or clients([]).
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({
      code: 200,
      message: "Message sent successfully",
      data: { message: newMessage },
    });
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCES BUT ACTUAL MESSAGES
    if (!conversation) {
      return res.status(200).json({
        code: 200,
        message: "No messages found",
        data: { messages: [] },
      });
    }

    const messages = conversation.messages;
    res.status(200).json({
      code: 200,
      message: "Messages fetched successfully",
      data: { messages: messages },
    });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
