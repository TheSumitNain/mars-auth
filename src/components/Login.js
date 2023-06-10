import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Icon } from "@iconify/react";
import logo from "../images/logo2.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("password");
  const [show, setShow] = useState("ic:sharp-remove-red-eye");

  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToogle = () => {
    if (type === "password") {
      setType("text");
      setShow("mdi:eye-off");
    } else {
      setType("password");
      setShow("ic:sharp-remove-red-eye");
    }
  };

  return (
    <>
      <div className="login_main">
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="logo" />
          <h2>Welcome to Mars Overseas</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <div className="div1">
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
          </div>
          
          <div>
            <label htmlFor="password">Password:</label>
            <div className="div2">
              <input
                type={type}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="show_hide" onClick={handleToogle}>
                <Icon icon={show} fontSize="30" />
              </p>
            </div>
            <br />
          </div>
          {error && <h4 className="error">{error}</h4>}
          <button>Login</button> <br />
        </form>
      </div>
    </>
  );
};

export default Login;
