import { useEffect, useState } from 'react'
import './App.css'
import ChatRoom from './components/ChatRoom';
import Auth from './components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <div>{user ? <ChatRoom /> : <Auth />}</div>;
}

export default App
