import React from "react";
import { useState, useEffect } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Company() {
  const [DBdata, setDBdata] = useState([]);
  const [oldData, setOldData] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldDataRes = JSON.parse(DataFromStorage);
    if (oldDataRes) {
      console.log(oldDataRes);

      if (oldDataRes.loginIn) {
        setOldData(true);
      }
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (oldData) {
      let getData = async () => {
        let res = await axios
          .get("http://localhost:3000/api/company", {
            withCredentials: true,
          }).then(res=>setDBdata(res.data))
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("Logins State");
            setOldData(false);
          });
      };
      getData();
    }
  }, [oldData]);

  return (
    <div>
      <h1> company</h1>

      {DBdata.map((item, index) => (
        <h2 key={index}>{item.name}</h2>
      ))}
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("Logins State");
          navigate("/login");
        }}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
}

export default Company;
