import { useEffect, useState } from 'react'
import './App.css'
import ChatRoom from './components/ChatRoom';
import Auth from './components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)

    });
  }, []);
  return <div>{loading ? <>Loading</> : user ? <ChatRoom /> : <Auth />}</div>;
}

export default App
