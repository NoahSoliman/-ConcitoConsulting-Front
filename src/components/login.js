import "./Register.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
import { Alert, Form, Col, Row, Button } from "react-bootstrap/";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldData = JSON.parse(DataFromStorage);

    if (oldData) {
      // console.log(oldData);
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

        // console.log(res);
        navigate("/company");
      }
    } catch (err) {
      console.log(err);
      setMessage("The email address or password is incorrect");
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="form-container ">
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm="4">
            Email address
          </Form.Label>

          <Col sm="8">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Col sm="5">
          {message ? (
            <Alert className="message" variant="danger">
              <p>{message}</p>
            </Alert>
          ) : null}
        </Col>
        <div className="button-container">
          <Button className="button-form" type="submit" variant="success">
            Login
          </Button>
          <br />
    
          <Button
            className="button-form"
            variant="outline-secondary"
            onClick={() => navigate("/registration")}
          >
            Don't have an account?
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
