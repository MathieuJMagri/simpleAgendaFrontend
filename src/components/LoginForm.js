import React from "react";
import { useState } from "react";

function LoginForm({ login, register, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [isLogIn, setIsLogIn] = useState(true);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const LoginsubmitHandler = (e) => {
    e.preventDefault();
    login(details);
  };

  const RegistersubmitHandler = (e) => {
    //TODO
    e.preventDefault();
    if (registerInfo.password !== registerInfo.confirmPassword) {
      alert("Passwords don't match");
    } else {
      register(registerInfo);
    }
  };

  return isLogIn ? (
    <form onSubmit={LoginsubmitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <div className="buttons">
          <input id="login-button" type="submit" value="LOGIN" />
          <input
            id="register-button"
            type="button"
            onClick={() => setIsLogIn(false)}
            value="REGISTER"
          />
        </div>
      </div>
    </form>
  ) : (
    <form onSubmit={RegistersubmitHandler}>
      <div className="form-inner">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="register-username"
            placeholder="Please choose an unique username"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, username: e.target.value })
            }
            value={registerInfo.username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="Please choose a strong password"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password: e.target.value })
            }
            value={registerInfo.password}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Retype Password:</label>
          <input
            type="password"
            name="password"
            id="register-retype-password"
            placeholder="Please retype your password"
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                confirmPassword: e.target.value,
              })
            }
            value={registerInfo.confirmPassword}
          />
        </div>
        <div className="buttons">
          <input
            type="button"
            id="back-login"
            onClick={() => setIsLogIn(true)}
            value="BACK"
          />
          <input id="submit-register" type="submit" value="SUBMIT" />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
