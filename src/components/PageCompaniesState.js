import React from "react";

import { useState, useEffect } from "react";

import { Form, Pagination, PageItem, Table, InputGroup } from "react-bootstrap";

function PageCompaniesState(props) {
  let test = props.allCompanies;
  // console.log(test);

  let [pageCompaniesState, setPageCompaniesState] = useState([]);

  let [extraOptions, setExtraOptions] = useState([]);
  let [clickHandleState, setClickHandleState] = useState([]);
  let [clickHandleStateNote, setClickHandleStateNote] = useState([]);

  let clickHandleProcess2 = (e, OrganizationOrgnr, index) => {
    console.log(extraOptions);
  };

  useEffect(() => {
    console.log("useEffect");

    if (clickHandleState.length) {
      console.log("clickHandleState.length");
      let prioElement = document.getElementById(`${clickHandleState[1]}prio`);
      let processElement = document.getElementById(
        `${clickHandleState[1]}process`
      );

      console.log(prioElement);
      console.log(processElement);
      let notProcesState = processElement.checked;
      let prioStete = prioElement.checked;

      if (notProcesState && prioStete) {
        processElement.checked = false;
        prioElement.checked = false;

        clickHandleState[0].target.checked = true;
      }
      // // console.log(OrganizationOrgnr);
      console.log(extraOptions);

      let found = extraOptions.find(
        (element) => element.OrganizationOrgnr === clickHandleState[1]
      );
      console.log(found);
      if (found) {
        console.log("found");
        found.notProcesseState = processElement.checked;
        found.prioState = prioElement.checked;

        if (notProcesState || prioStete) {
          console.log("notProcesState || prioStete");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.OrganizationOrgnr !== clickHandleState[1]
            ),
            found,
          ]);
        } else if ((!notProcesState || prioStete) && found.note) {
          console.log("!notProcesState || prioStete");

          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.OrganizationOrgnr !== clickHandleState[1]
            ),
            {
              OrganizationOrgnr: clickHandleState[1],
              note: found.note,
            },
          ]);
        } else if ((!notProcesState || prioStete) && !found.note) {
          console.log("remove");
          setClickHandleState([]);
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.OrganizationOrgnr !== clickHandleState[1]
            ),
          ]);
        }
      } else {
        setExtraOptions((prev) => [
          ...prev,
          {
            OrganizationOrgnr: clickHandleState[1],
            notProcesseState: processElement.checked,
            prioState: prioElement.checked,
          },
        ]);
      }
    }

    if (clickHandleStateNote.length) {
      let note = clickHandleStateNote[0].target.value;

      // console.log(OrganizationOrgnr);

      let found = extraOptions.find(
        (element) => element.OrganizationOrgnr === clickHandleStateNote[1]
      );
      // if (note) {

      if (found && note) {
        found.note = note;

        console.log(found);
        console.log(found.notProcesseState);
        console.log(found.prioState);
        if (found.notProcesseState === false && found.prioState === false) {
          console.log("!found.notProcesState&&!found.prioState");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.OrganizationOrgnr !== clickHandleStateNote[1]
            ),
            {
              OrganizationOrgnr: clickHandleStateNote[1],
              note: found.note,
            },
          ]);
        } else if (found.notProcesState || found.prioState) {
          console.log("found.notProcesState ||found.prioState");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.OrganizationOrgnr !== clickHandleStateNote[1]
            ),

            found,
          ]);
        }
      } else if (!found && note) {
        setExtraOptions((prev) => [
          ...prev,
          {
            OrganizationOrgnr: clickHandleStateNote[1],

            note: note,
          },
        ]);
      } else if ((found.prioState || found.notProcesseState) && !note) {
        // console.log("((found.prioState || found.notProcesState) && !note)");
        setClickHandleStateNote([]);
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.OrganizationOrgnr !== clickHandleStateNote[1]
          ),
          {
            OrganizationOrgnr: clickHandleStateNote[1],
            notProcesseState: found.notProcesseState,
            prioState: found.prioState,
          },
        ]);
      } else if (found && !note) {
        console.log(found);
        console.log(!note);
        console.log("found && !note)-found && !note)-found && !note)");
        setClickHandleStateNote([]);
        setClickHandleState([]);
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.OrganizationOrgnr !== clickHandleStateNote[1]
          ),
        ]);
      }
    }

    // محاولة معرفة لماذا يتكرر الحفظ عند ادخال الحقل الاول فقط حرف واحد واذا ما كانت هذه الطريقة افضل من التي قبلها
  }, [clickHandleState, clickHandleStateNote]);

  let clickHandleProcess = (e, OrganizationOrgnr, index) => {};

  // ------------------------------------------------------------------------------
  let clickHandleNote = (e, OrganizationOrgnr, index) => {};

  useEffect(() => {
    console.log("useEffect get allCompanies");

    let pageCompanies = props.allCompanies
      ? props.allCompanies.map(
          (
            {
              OrganizationOrgnr,
              OrganizationName,
              OrganizationWeb,
              OrganizationBransch,
              OrganizationEmployees,
              OrganizationTurnover,
              Moderbolag,
            },
            index
          ) => {
            // console.log(OrganizationOrgnr)

            return (
              <tr key={OrganizationOrgnr}>
                <td>{index + 1}</td>
                <td> {OrganizationName}</td>

                <td>
                  <Form.Check
                    type={"checkbox"}
                    id={OrganizationOrgnr + "process"}
                    onClick={(e) =>
                      setClickHandleState([e, OrganizationOrgnr, index])
                    }
                  />
                </td>
                <td>
                  <Form.Check
                    type={"checkbox"}
                    id={OrganizationOrgnr + "prio"}
                    onClick={(e) =>
                      setClickHandleState([e, OrganizationOrgnr, index])
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    id={OrganizationOrgnr + "note"}
                    onChange={(e) =>
                      setClickHandleStateNote([e, OrganizationOrgnr, index])
                    }
                  />
                </td>

                <td> {OrganizationWeb}</td>
                <td> {OrganizationBransch}</td>
                <td> {OrganizationEmployees}</td>
                <td> {OrganizationTurnover}</td>
                <td> {Moderbolag}</td>
              </tr>
            );
          }
        )
      : "";
    setPageCompaniesState(pageCompanies);
    setClickHandleState([])
    setClickHandleStateNote([])
  }, [props]);

  return <>{pageCompaniesState}</>;
}

export default PageCompaniesState;
