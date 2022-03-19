import "./Register.css";
import { useState ,useEffect} from "react";
import { Routes, Route, Link ,useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          value={repeatPassword}
          placeholder="Repeat Password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      <span onClick={() => navigate("/login")}>Do You have an account?</span>
        
      </form>

   

    </div>
  );
}

export default Register;
