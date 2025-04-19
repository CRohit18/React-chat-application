/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useMemo, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routeConstants } from "../routes/routeConstant";

export default function Auth() {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation()
  const navigate = useNavigate()

  const isCreatePage = useMemo(() => location?.pathname.startsWith(routeConstants.create), [location?.pathname])
  const isLoginPage = useMemo(() => location?.pathname.startsWith(routeConstants.login), [location?.pathname])


  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Logic between login and logout page 
  const handleCreate = () => {
    if (isLoginPage) {
      askForPassword("2325", function () {
        window.alert("User authenticated successfully!");
        navigate(routeConstants.create)
        // Perform any action after successful validation
      });

    } else if (isCreatePage) {
      signUp()
    }
  }

  // Sign Up Function (With Display Name)
  const signUp = useCallback(async () => {
    const { email, password, displayName } = formData;
    if (!displayName || !email || !password) {
      messageApi.error("All fields are required !");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      messageApi.success(`Account created! Welcome, ${displayName}`)
    } catch (error) {
      messageApi.error(error.message);
    }
  }, [formData]);

  // Sign In Function
  const signIn = useCallback(async () => {
    const { email, password } = formData;
    if (!email || !password) {
      messageApi.error("Email and password are required !");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      messageApi.success("Signed in successfully !");
    } catch (error) {
      messageApi.error("Invalid credentials !");
    }
  }, [formData]);

  const askForPassword = (correctPassword, onSuccess) => {
    let attempts = 1;
    while (attempts > 0) {
      const password = window.prompt("Enter your password:");
      if (!password) {
        alert("Cancelled or empty input.")
      };

      if (password === correctPassword) {
        alert("Access Granted!");
        onSuccess(); // Call success function
        return;
      } else {
        attempts--;
        alert(`Incorrect password. ${attempts} attempts remaining.`);
      }
    }
    navigate(routeConstants.login)
    alert("Too many failed attempts. Access Denied!");
  }

  useEffect(() => {
    if (isCreatePage) {
      askForPassword("2325", function () {
        window.alert("User authenticated successfully!");
        // Perform any action after successful validation
      });
    }
  }, [])

  return (
    <>
      {contextHolder}
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome! 👋</h2>
            <p>Sign up or Sign in to continue</p>
          </div>

          {/* Display Name Input */}
          {isCreatePage && <InputField
            type="text"
            name="displayName"
            label="Display Name"
            value={formData.displayName}
            onChange={handleChange}
          />}

          {/* Email Input */}
          <InputField
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input */}
          <InputField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Authentication Buttons */}
          <div className="auth-actions">
            {isLoginPage &&
              <button className="auth-btn signin-btn" onClick={signIn}>
                Sign In
              </button>
            }
            <button className="auth-btn signup-btn"
              onClick={() => handleCreate()}
            >
              Create Account
            </button>
            {isCreatePage &&
              <button className="auth-btn signup-btn"
                onClick={() => navigate(routeConstants.login)}
              >
                Back to login
              </button>
            }

          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Input Component
const InputField = ({ type, name, label, value, onChange }) => (
  <div className="input-group">
    <input type={type} name={name} className="auth-input" value={value} onChange={onChange} />
    <label htmlFor={name} className="input-label">
      {label}
    </label>
  </div>
);
