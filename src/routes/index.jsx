import { Navigate, Routes as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import ChatRoom from "../components/ChatRoom";
import Auth from "../components/Auth";
import { routeConstants } from "./routeConstant";

const Routes = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        
        <Router>
            {user ? (
                <>
                    <Route path={routeConstants.chat} element={<ChatRoom />} />
                    <Route path="*" element={<Navigate to={routeConstants.chat} />} />
                </>
            ) : (
                <>
                    <Route path={routeConstants.login} element={<Auth />} />
                    <Route path={routeConstants.create} element={<Auth />} />
                    <Route path="*" element={<Navigate to={routeConstants.login} />} />
                </>
            )}
        </Router>
    );
};

export default Routes;
