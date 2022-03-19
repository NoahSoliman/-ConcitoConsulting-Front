import "./Register.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginIn } from "../action/action.jsx";
import { useSelector, useDispatch } from "react-redux";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldData = JSON.parse(DataFromStorage);

    if (oldData) {
      console.log(oldData);
      if (oldData.loginIn) {
        navigate("/company");
      }
    } else {
      navigate("/login");
    }
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      //   console.log(res.status);
      if (res.statusText === "OK") {
        // dispatch(loginIn(true))

        localStorage.setItem("Logins State", JSON.stringify({ loginIn: true }));

        console.log(res);
        navigate("/company")
      }

      //   console.log(!resJson.hasOwnProperty("errors"));

      //   if (res.status === 200 && !resJson.hasOwnProperty("errors")) {
      //     // setName("");
      //     // setEmail("");
      //     // setPassword("");
      //     setMessage("User created successfully");
      //   } else {
      //   }
    } catch (err) {
      console.log(err);
      setMessage("The email address or password is incorrect");

    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        <span onClick={() => navigate("/registration")}>
          Dont have an account?
        </span>
      </form>
    </div>
  );
}

export default Register;
