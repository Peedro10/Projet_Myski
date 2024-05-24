import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import backgroundImage from '../../assets/9.jpg'; // Assurez-vous que le chemin est correct

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (err) setErr(null);  // Reset errors on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr("Please fill in all fields");
      return;
    }
  
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");  // Navigate to login after successful registration
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="register" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="register-container">
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" name="username" value={inputs.username} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" value={inputs.email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" value={inputs.password} onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" value={inputs.name} onChange={handleChange} />
            {err && <p className="error">{err}</p>}
            <button type="submit">Register</button>
          </form>
          <span>Already have an account?</span>
          <Link to="/login"><button className="switch-button">Login</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
