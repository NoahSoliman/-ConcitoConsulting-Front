import "./Register.css";
import { useState ,useEffect} from "react";
import { Routes, Route, Link ,useNavigate } from "react-router-dom";
import { Alert, Form, Col, Row, Button } from "react-bootstrap/";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  // function isEmptyObject(obj) {
  //   return JSON.stringify(obj) === "{}";
  // }


  let navigate = useNavigate();
  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldData = JSON.parse(DataFromStorage);

    if (oldData) {
      console.log(oldData);
      if (oldData.loginIn) {
        navigate("/company");
      } }
    // } else {
    //   navigate("/registration");
    // }
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log(name, email, password);
      try {
        let res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        // console.log(res)

        let resJson = await res.json();

        console.log(!resJson.hasOwnProperty("errors"));
        console.log(resJson);

        if (res.status === 200 && resJson.hasOwnProperty("sameEmail")) {
          setMessage("  You have already an account in this mail");
          
        } else if (res.status === 200 && !resJson.hasOwnProperty("errors")) {
          // setName("");
          // setEmail("");
          // setPassword("");
          setMessage("User created successfully");
          alert("User created successfully")
          navigate("/login");

        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    } else setMessage("write the same password");
  };

  return (
    <div className="container">



<Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="mb-4"
          controlId="exampleForm.ControlInput1"
        >
    <Form.Label column sm="4" >
    Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </Col>
        </Form.Group>



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
              value={password}
 onChange={(e) => setPassword(e.target.value)}            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
          Repeat Password
                    </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              />
          </Col>
        </Form.Group>



        

        {message ?
          <Alert  className="message" size="10"  variant="warning">
     <p>{message}</p> 
          </Alert>
          : null}

          <div  className= "button-container"> 

        <Button  className= "button-form" type="submit" variant="dark">
        Create
        </Button>
        <br />

     
        <Button className= "button-form"
          variant="outline-secondary"
          onClick={() => navigate("/login")}
        >
         Do You have an account?
        </Button>

        </div>
      </Form>

   

    </div>
  );
}

export default Register;
