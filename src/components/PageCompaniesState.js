import React from "react";

import { useState, useEffect } from "react";

import { Form, Pagination, PageItem, Table, InputGroup } from "react-bootstrap";

function PageCompaniesState(props) {
  let test = props.allCompanies;
  console.log(test);

  const [pageCompaniesState, setPageCompaniesState] = useState([]);

  let [extraOptions, setExtraOptions] = useState([]);



  
  let clickHandleProcess = (e, OrganizationOrgnr, index) => {
    let prioElement = document.getElementById(`${OrganizationOrgnr}prio`);
    let processElement = document.getElementById(`${OrganizationOrgnr}process`);

    console.log(prioElement);
    console.log(processElement);
    let notProcesState = processElement.checked;
    let prioStete = prioElement.checked;

    if (notProcesState && prioStete) {
      processElement.checked = false;
      prioElement.checked = false;

      e.target.checked = true;
    }
    // sssssss
    const found = extraOptions.find(
      (element) => element.OrganizationOrgnr === OrganizationOrgnr
    );
    if (found) {
      found.notProcesseState = processElement.checked;
      found.prioState = prioElement.checked;

      if (notProcesState || prioStete) {
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.OrganizationOrgnr !== OrganizationOrgnr
          ),
          found,
        ]);
      } else if ((!notProcesState || prioStete) && found.note) {
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.OrganizationOrgnr !== OrganizationOrgnr
          ),
          {
            OrganizationOrgnr: OrganizationOrgnr,
            note: found.note,
          },
        ]);
      } else if ((!notProcesState || prioStete) && !found.note) {
        setExtraOptions((prev) => [
          ...prev.filter(
            (item) => item.OrganizationOrgnr !== OrganizationOrgnr
          ),
        ]);
      }
    } else {
      setExtraOptions((prev) => [
        ...prev,
        {
          OrganizationOrgnr: OrganizationOrgnr,
          notProcesseState: processElement.checked,
          prioState: prioElement.checked,
        },
      ]);
    }
  };

  // ------------------------------------------------------------------------------
  let clickHandleNote = (e, OrganizationOrgnr, index) => {
    let note = e.target.value;

    console.log(OrganizationOrgnr);

    const found = extraOptions.find(
      (element) => element.OrganizationOrgnr === OrganizationOrgnr
    );

    // if (note) {

    if (found && note) {
      found.note = note;

      console.log(found);

      setExtraOptions((prev) => [
        ...prev.filter((item) => item.OrganizationOrgnr !== OrganizationOrgnr),

        found,
      ]);
    } else if (!found && note) {
      setExtraOptions((prev) => [
        ...prev,
        {
          OrganizationOrgnr: OrganizationOrgnr,

          note: note,
        },
      ]);
    } else if ((found.prioState || found.notProcesseState) && !note) {
      console.log("((found.prioState || found.notProcesState) && !note)");
      setExtraOptions((prev) => [
        ...prev.filter((item) => item.OrganizationOrgnr !== OrganizationOrgnr),
        {
          OrganizationOrgnr: OrganizationOrgnr,
          notProcesseState: found.notProcesseState,
          prioState: found.prioState,
        },
      ]);
    } else if (found && !note) {
      setExtraOptions((prev) => [
        ...prev.filter((item) => item.OrganizationOrgnr !== OrganizationOrgnr),
      ]);
    }
  };

  // const [allccompanies, setAllccompanies] = useState([]);

  useEffect(() => {
    // setAllccompanies(test)

    // for (let i = 0; i < props.allCompanies.length; i++) {
    //   let ptworkinfo =React.createElement('input',{type: 'checkbox', defaultChecked: false});

    //   console.log(ptworkinfo);
    //   setPagetest((prevState) => [...prevState, ptworkinfo]);
    // }
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
          ) => (
            
              <tr key={OrganizationOrgnr}>
                <td>{index + 1}</td>
                <td> {OrganizationName}</td>

                <td>
                  <Form.Check
                    type={"checkbox"}
                    id={OrganizationOrgnr + "process"}
                    onClick={(e) =>
                      clickHandleProcess(e, OrganizationOrgnr, index)
                    }
                  />
                </td>
                <td>
                  <Form.Check
                    type={"checkbox"}
                    id={OrganizationOrgnr + "prio"}
                    onClick={(e) =>
                      clickHandleProcess(e, OrganizationOrgnr, index)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    onChange={(e) =>
                      clickHandleNote(e, OrganizationOrgnr, index)
                    }
                  />
                </td>

                <td> {OrganizationWeb}</td>
                <td> {OrganizationBransch}</td>
                <td> {OrganizationEmployees}</td>
                <td> {OrganizationTurnover}</td>
                <td> {Moderbolag}</td>
              </tr>
            
          )
        )
      : "";
    setPageCompaniesState(pageCompanies);
  }, [props,extraOptions]);

  return <>{pageCompaniesState}</>;
}

export default PageCompaniesState;
