import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const defaultUser = {
      email: "johndoe@fake.com", // Example login credentials from the fake API
      password: "password123",
    };

    // For simplicity, we use the default credentials as the login credentials
    if (email === defaultUser.email && password === defaultUser.password) {
      // Store token in localStorage (this is a mock, actual API would return token)
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/");
    } else {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
