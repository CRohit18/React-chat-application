import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot, serverTimestamp, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { format } from "date-fns";
import { Trash, TrashStatic } from "../constant/images";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, message as Message } from "antd";
import Picker from "emoji-picker-react";
import useOutsideClick from "../hooks/useOutsideClick";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import for navigation

export default function ChatRoom() {
  // State Hooks
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [messageApi, contextHolder] = Message.useMessage();
  const navigate = useNavigate(); // For navigation

  // Refs
  const bottomRef = useRef(null);
  const emojiRef = useRef(null);
  const inputRef = useRef(null);

  // Close Emoji Picker when clicking outside
  useOutsideClick(emojiRef, () => setShowPicker(false));

  // Handle Emoji Selection
  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event?.emoji);
    inputRef.current.focus();
    setShowPicker(false);
  };

  // Send Message to Firebase
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        isDeleted: false,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  // Delete Message (Soft Delete)
  const deleteMessage = async (messageId) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      await updateDoc(messageRef, { isDeleted: true });
      messageApi.success("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      messageApi.error("Something went wrong!");
    }
  };

  // Fetch Messages from Firebase
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);

      // Scroll to bottom when messages update
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      inputRef.current.focus();
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      messageApi.error("Logout failed!");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="chat-container">
        <header className="chat-header">
          <h2 className="m-0">Chat Room</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === auth.currentUser?.email ? "sent" : "received"}`}>
              <div className="message-content">
                <p>{msg.isDeleted ? "This message is deleted." : msg.text}</p>
                <span className="message-timestamp">
                  {msg.displayName} {msg.timestamp ? format(msg.timestamp.toDate(), "HH:mm") : "Sending..."}

                  {/* Delete Message Button */}
                  {msg.sender === auth.currentUser?.email && !msg.isDeleted && (
                    <Popconfirm
                      title="Are you sure you want to delete this message?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={() => deleteMessage(msg.id)}
                    >
                      <img
                        src={TrashStatic}
                        alt="Delete"
                        onMouseOver={(e) => (e.currentTarget.src = Trash)}
                        onMouseOut={(e) => (e.currentTarget.src = TrashStatic)}
                        className="trash-icon"
                      />
                    </Popconfirm>
                  )}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Message Input Area */}
        <form onSubmit={sendMessage} className="chat-input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            ref={inputRef}
          />

          {/* Emoji Picker */}
          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((prev) => !prev)}
            style={{ height: "35px", width: "35px", cursor: "pointer" }}
          />
          {showPicker && (
            <div ref={emojiRef}>
              <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} lazyLoadEmojis />
            </div>
          )}

          {/* Send Button */}
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
