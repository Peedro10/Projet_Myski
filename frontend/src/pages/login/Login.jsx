import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import videoSource from '../../assets/12.mp4';  // Assurez-vous que le chemin d'accès est correct

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      // Check if err.response and err.response.data exist
      const errorMessage = err.response && err.response.data ? err.response.data : "An unexpected error occurred";
      setErr(errorMessage);
    }
  };
  

  return (
    <div className="login-container">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && <p className="error">{err}</p>}
            <button type="submit">Login</button>
          </form>
          <span>Don't have an account?</span>
          <Link to="/register"><button className="register-button">Register</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
