import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { format } from "date-fns";
import { Angry, Trash, TrashStatic } from "../constant/images";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { message as Message } from 'antd';
import Picker from "emoji-picker-react";
import useOutsideClick from "../hooks/useOutsideClick";

const AngrySvg = () => (
  <img src={Angry} style={{ height: "15px", width: "15px" }} />
);

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messageApi, contextHolder] = Message.useMessage();
  const [NewMessages, setNewMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const bottomRef = useRef(null);
  const emojiRef = useRef(null);
  const inputRef = useRef(null);
  
  useOutsideClick(emojiRef, () => setShowPicker(false));

  const onEmojiClick = (event) => {
    setMessage((prevInput) => prevInput + event?.emoji);
    inputRef.current.focus()
    setShowPicker(false);
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: (
        <span>
          Nhi hoga delete! <AngrySvg />
        </span>
      ),
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: auth.currentUser.email,
        timestamp: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setNewMessages(messagesData);
      // Scroll to bottom when messages update
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      inputRef.current.focus()
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {contextHolder}
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat Room</h2>
        </div>

        <div className="chat-messages">
          {NewMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === auth.currentUser.email ? "sent" : "received"
                }`}
            >
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-timestamp" style={{ color: "black" }}>
                  {msg?.sender} {msg.timestamp
                    ? format(msg.timestamp.toDate(), "HH:mm")
                    : "Sending..."}
                  <Popconfirm
                    title="Ye wala delete karna hai kya teroko ?"
                    description="Delete karna hai to ok pe click kar."
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={error}
                  >
                    <img
                      src={TrashStatic} // Static image by default
                      alt="Delete"
                      onMouseOver={(e) => (e.currentTarget.src = Trash)} // Switch to GIF on hover
                      onMouseOut={(e) => (e.currentTarget.src = TrashStatic)} // Switch back to static image on mouse out
                      className="trash-icon"
                    />
                  </Popconfirm>
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="chat-input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            ref={inputRef}
          />
          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}
            style={{ height: "35px", width: "35px" }}
          />
          {showPicker && (
            <div ref={emojiRef}>
              <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} lazyLoadEmojis />
            </div>
          )}
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}