import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import "./SignUp.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/users", formData);
      navigate("/login");
    } catch (error) {
      console.error("Register error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password-button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" disabled={loading} className="registerbtn">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
