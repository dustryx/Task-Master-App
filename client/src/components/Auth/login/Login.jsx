import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { api, setAuthToken } from "../../../utils/api";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      // localStorage.setItem("username", user.username);
      setAuthToken(access_token);
      window.alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login error", error);
      window.alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="showbtn"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button className="loginbtn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
