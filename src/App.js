import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


function App() {


  
  let navigate = useNavigate();

  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldData = JSON.parse(DataFromStorage);
    if (oldData) {
    console.log(oldData);

      if (oldData.loginIn) {
        navigate("/company");
      }
    } 
    else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Link to="/"> </Link>
      <Link to="/login"> </Link>
      <Link to="/registration"> </Link>
      <Link to="/company"> </Link>
      <Link to="/test"> </Link>
    </div>
  );
}

export default App;
