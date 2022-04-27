import React from "react";

import { useState, useEffect } from "react";

import { Form, Pagination, PageItem, Table, InputGroup } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { setCustomerOptions } from "../action/action";

function PageCompaniesState(props) {
  const dispatch = useDispatch();

  let [pageCompaniesState, setPageCompaniesState] = useState([]);

  let [extraOptions, setExtraOptions] = useState([]);
  let [clickHandleState, setClickHandleState] = useState([]);
  let [clickHandleStateNote, setClickHandleStateNote] = useState([]);

  useEffect(() => {
    // console.log(" dispatch options");
    dispatch(setCustomerOptions(extraOptions));

  }, [extraOptions]);

  useEffect(() => {
    // console.log("useEffect save options");

    if (clickHandleState.length) {
      // console.log("clickHandleState.length");
      let prioElement = document.getElementById(`${clickHandleState[1]}prio`);
      let processElement = document.getElementById(
        `${clickHandleState[1]}process`
      );

      // console.log(prioElement);
      // console.log(processElement);
      let notProcesState = processElement.checked;
      let prioStete = prioElement.checked;

      if (notProcesState && prioStete) {
        processElement.checked = false;
        prioElement.checked = false;

        clickHandleState[0].target.checked = true;
      }
      // // console.log(organizationOrgnr);
      // console.log(extraOptions);

      let found = extraOptions.find(
        (element) => element.organizationOrgnr === clickHandleState[1]
      );
      // console.log(found);
      if (found) {
        // console.log("found");
        found.notProcesseState = processElement.checked;
        found.prioState = prioElement.checked;

        if (notProcesState || prioStete) {
          // console.log("notProcesState || prioStete");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.organizationOrgnr !== clickHandleState[1]
            ),
            found,
          ]);
        } else if ((!notProcesState || prioStete) && found.note) {
          // console.log("!notProcesState || prioStete");

          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.organizationOrgnr !== clickHandleState[1]
            ),
            {
              organizationOrgnr: clickHandleState[1],
              note: found.note,
            },
          ]);
        } else if ((!notProcesState || prioStete) && !found.note) {
          // console.log("!notProcesState || prioStete)rem");
          setClickHandleState([]);
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.organizationOrgnr !== clickHandleState[1]
            ),
          ]);
        }
      } else {
        // console.log("else else else ");
        setExtraOptions((prev) => [
          ...prev,
          {
            organizationOrgnr: clickHandleState[1],
            notProcesseState: processElement.checked,
            prioState: prioElement.checked,
          },
        ]);
      }
    }

    if (clickHandleStateNote.length) {
      let note = clickHandleStateNote[0].target.value;

      // console.log(organizationOrgnr);

      let found = extraOptions.find(
        (element) => element.organizationOrgnr === clickHandleStateNote[1]
      );
      // if (note) {

      if (found && note) {
        found.note = note;

        // console.log("found && note");
        // console.log(found);
        // console.log(note.notProcesseState);
        // console.log(found.notProcesseState);
        // console.log(found.prioState);
        if (found.notProcesseState === undefined && found.prioState === undefined) {
          // console.log("!found.notProcesState&&!found.prioState");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.organizationOrgnr !== clickHandleStateNote[1]
            ),
            {
              organizationOrgnr: clickHandleStateNote[1],
              note: found.note,
            },
          ]);
        } else
         if (found.notProcesseState || found.prioState) {

          // console.log("found.notProcesState ||found.prioState");
          setExtraOptions((prev) => [
            ...prev.filter(
              (item) => item.organizationOrgnr !== clickHandleStateNote[1]
            ),

            found,
          ]);
        }
      } else if (!found && note) {
          console.log("!found && note");

        setExtraOptions((prev) => [
          ...prev,
          {
            organizationOrgnr: clickHandleStateNote[1],

            note: note,
          },
        ]);
      } else if ((found.prioState || found.notProcesseState) && !note) {
        console.log("((found.prioState || found.notProcesState) && !note)");
        setClickHandleStateNote([]);
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.organizationOrgnr !== clickHandleStateNote[1]
          ),
          {
            organizationOrgnr: clickHandleStateNote[1],
            notProcesseState: found.notProcesseState,
            prioState: found.prioState,
          },
        ]);
      } else if (found && !note) {
        // console.log(found);
        // console.log(!note);
        // console.log("found && !note)-found && !note)-found && !note)");
        setClickHandleStateNote([]);
        setClickHandleState([]);
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.organizationOrgnr !== clickHandleStateNote[1]
          ),
        ]);
      }
    }

    // محاولة معرفة لماذا يتكرر الحفظ عند ادخال الحقل الاول فقط حرف واحد واذا ما كانت هذه الطريقة افضل من التي قبلها
  }, [clickHandleState, clickHandleStateNote]);

  // ------------------------------------------------------------------------------
  useEffect(() => {
    extraOptions.map((item) => {
      // console.log("useEffect check item that checked");
      // console.log(item);
      // let orgProcessId = item.organizationOrgnr + "process";
      // let prioElement = document.getElementById(`${clickHandleState[1]}prio`);
      let notProcessElement = document.getElementById(
        `${item.organizationOrgnr}process`
      );
      let prioElement = document.getElementById(
        `${item.organizationOrgnr}prio`
      );
      let noteElement = document.getElementById(
        `${item.organizationOrgnr}note`
      );
      if (notProcessElement) notProcessElement.checked = item.notProcesseState;
      // //
      if (prioElement) prioElement.checked = item.prioState;

      if (noteElement && item.note) noteElement.value = item.note;
    });
  }, [pageCompaniesState]);

  useEffect(() => {
    // console.log("useEffect get allCompanies");

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
            // console.log(organizationOrgnr)

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
    setClickHandleState([]);
    setClickHandleStateNote([]);
  }, [props]);

  return <>{pageCompaniesState}</>;
}

export default PageCompaniesState;

/* انشاء فانكشن يوز افيكت تتحدث مع تحديث الاوبشن وتزامن الاوبش مع الريدويسر ومن ثم نقوم بالوصول الى الستيت في الريدوسير من مكون الكمبيوني */
