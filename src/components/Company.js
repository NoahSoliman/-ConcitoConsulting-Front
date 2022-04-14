import React from "react";
import { useState, useEffect } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";

import {
  selectedPage,
  selectedCompanies,
  setCustomerBranchChoice,
} from "../action/action";

function Company() {
  const [DBdata, setDBdata] = useState([]);
  const [oldData, setOldData] = useState("");
  const [customerChoice, setCustomerChoice] = useState([]);
  // const [selectedCompanies, setSelectedCompanies] = useState([]);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const reducerState = useSelector((state) => {
    return state;
  });

  // console.log(reducerState)

  useEffect(() => {
    let DataFromStorage = localStorage.getItem("Logins State");
    let oldDataRes = JSON.parse(DataFromStorage);
    if (oldDataRes) {
      if (oldDataRes.loginIn) {
        setOldData(true);
      }
    } else {
      navigate("/login");
    }
  }, [oldData]);

  useEffect(() => {
    if (oldData) {
      let getData = async () => {
        let res = await axios
          .get("http://localhost:3000/api/company", {
            withCredentials: true,
          })
          .then((res) => setDBdata(res.data))
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("Logins State");
            setOldData(false);
          });
      };
      getData();
    }
  }, [oldData]);

  let sendData = async () => {
    dispatch(setCustomerBranchChoice(customerChoice));
    dispatch(selectedPage(1));
    navigate(`/companies/${1}`);

   
  };

  function toggleAll(source) {
    let selectAllClass = document.getElementsByClassName(`form-check-input`);

    let selectAllName = document.getElementsByName(`selectAll`);

    // console.log(selectAllClass);

    for (let i = 0; i < selectAllClass.length; i++) {
      selectAllClass[i].checked = source.checked;

      if (source.checked) {
        // console.log(!selectAllName[i]);
        if (selectAllName[i]) {
          if (customerChoice.indexOf(selectAllName[i].value) === -1) {
            setCustomerChoice((prevState) => [
              ...prevState,
              Number(selectAllName[i].value),
            ]);
          }
        }
      }

      if (!source.checked) {
        setCustomerChoice((prevState) => [
          ...prevState.filter(
            (value) => value !== Number(selectAllName[i].value)
          ),
        ]);
      }
    }
  }

  function toggle(source, theClass) {
    let checkClass = document.getElementsByClassName(`${theClass}`);

    // console.log(checkClass);
    // console.log(theClass);

    for (let i = 0; i < checkClass.length; i++) {
      checkClass[i].childNodes[0].checked = source.checked;

      if (source.checked) {
        if (customerChoice.indexOf(checkClass[i].childNodes[0].value) === -1) {
          setCustomerChoice((prevState) => [
            ...prevState,
            Number(checkClass[i].childNodes[0].value),
          ]);

          checkClass[i].style.display = "block";
        }
      }
      if (!source.checked) {
        checkClass[i].style.display = "none";
        setCustomerChoice((prevState) => [
          ...prevState.filter(
            (value) => value !== Number(checkClass[i].childNodes[0].value)
          ),
        ]);
      }
    }
  }

  function checkHandle(source) {
    // console.log("source");
    // console.log(source);
    if (source.checked) {
      setCustomerChoice((prevState) => [...prevState, Number(source.value)]);
    }
    if (!source.checked) {
      setCustomerChoice((prevState) => [
        ...prevState.filter((value) => value !== Number(source.value)),
      ]);
    }
  }

  return (
    <div>
      <h1> company</h1>
      <button type="button" onClick={sendData}>
        Sök företag inom markerade branscher
      </button>
      <Form.Check
        type={"checkbox"}
        id={"selectAll"}
        label="Select All"
        style={{ marginBottom: 20, marginTop: 40, fontWeight: "bold" }}
        onClick={(e) => toggleAll(e.target)}
      />
      {DBdata.map(({ Denomination, branch, SNI2Digits, SNI3Digits }, index) => {
        return (
          <Form key={index}>
            {Denomination ? (
              <Form.Check
                type={"checkbox"}
                id={SNI2Digits}
                label={Denomination}
                value={SNI2Digits}
                onClick={(e) => toggle(e.target, SNI2Digits)}
              />
            ) : (
              ""
            )}
            {branch ? (
              <Form.Check
                className={SNI3Digits.toString().slice(0, -1)}
                type={"checkbox"}
                id={SNI3Digits}
                label={branch}
                name={"selectAll"}
                value={SNI3Digits}
                style={{ marginLeft: 50, display: "none" }}
                onClick={(e) => checkHandle(e.target)}
              />
            ) : (
              ""
            )}
          </Form>
        );
      })}
      <br />

      <button type="button" onClick={sendData}>
        Sök företag inom markerade branscher
      </button>
      <br />
      <br />
      <br />

      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("Logins State");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Company;
