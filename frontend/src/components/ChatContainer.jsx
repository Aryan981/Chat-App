import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages()

      return ()=>unSubscribeFromMessages()
    }
  }, [selectedUser._id, getMessages,subscribeToMessages,unSubscribeFromMessages]);

  // Auto-scroll to the most recent message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3" id="messages-container">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-base-content/50 text-sm">
              Start a conversation with {selectedUser.fullName}
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border border-base-300 shadow-sm">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-60 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div 
                  className={`chat-bubble ${
                    message.senderId === authUser._id 
                      ? "bg-primary text-primary-content" 
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[300px] rounded-md mb-2 hover:opacity-95 transition-opacity cursor-pointer"
                      onLoad={scrollToBottom} // Ensure scroll happens after image loads
                    />
                  )}
                  {message.text && <p className="break-words">{message.text}</p>}
                </div>
                <div className="chat-footer opacity-60 text-xs mt-1">
                  {message.senderId === authUser._id ? "You" : selectedUser.fullName}
                </div>
              </div>
            ))}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <MessageInput scrollToBottom={scrollToBottom} />
    </div>
  );
};

export default ChatContainer;