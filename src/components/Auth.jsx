/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { message } from "antd";

export default function Auth() {
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          <InputField
            type="text"
            name="displayName"
            label="Display Name"
            value={formData.displayName}
            onChange={handleChange}
          />

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
            <button className="auth-btn signin-btn" onClick={signIn}>
              Sign In
            </button>
            <button className="auth-btn signup-btn" onClick={signUp}>
              Create Account
            </button>
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
