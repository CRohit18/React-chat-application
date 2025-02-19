import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function ChatRoom() {
  const [message, setMessage] = useState("");

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

const [NewMessages, setNewMessages] = useState([]);

useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setNewMessages(messagesData);
    });
    return unsubscribe;
  }, []);

return (<>
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>

    <div>
      {NewMessages.map((msg) => (
        <div key={msg.id}>
          <p>{msg.sender}: {msg.text}</p>
        </div>
      ))}
      {/* Existing form */}
    </div></>
  );
}