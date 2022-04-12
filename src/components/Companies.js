import React from "react";
import "./Companies.css";

import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Form, Pagination, PageItem, Table, InputGroup } from "react-bootstrap";

import {
  selectedPage,
  selectedCompanies,
  setCustomerBranchChoice,
} from "../action/action";

function Companies(props) {
  //   const params = useParams();
  //   console.log(params.id);
  //   const { state } = useLocation();

  const [activePage, setActivePage] = useState(1);
  const [itemsState, setItemsState] = useState([]);
  const [num, setNum] = useState(1);
  const [maxNum, setMaxNum] = useState(10);
  const [totalPage, setTotalPage] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [process, setProcess] = useState(false);
  const [prioChecket, setPrioChecket] = useState(false);
  const [allTaHead, setAllTaHead] = useState([
    // "OrganizationOrgnr",
    "OrganizationName",
    "Bearbeta ej",
    "PRIO",
    "Ev. Not till Concito",
    // "OrganizationStreetName",
    // "OrganizationZIPCode",
    // "OrganisationKommun",
    // "OrganizationCity",
    // "OrganizationRegion",
    // "OrganizationTelefon",
    "OrganizationWeb",
    // "OrganizationMail",
    "OrganizationBransch",
    // "OrganizationSNI1",
    "OrganizationEmployees",
    "OrganizationTurnover",
    "Moderbolag",
    // "RegNumberOfDigits",
    // "SNI2Numbers",
    // "SNI3Numbers",
    // "SNI4Numbers",
    // "SNI5Numbers",
    // "OrganizationV1W1",
    // "Postadress",
    // "Postnummer",
    // "Stad",
    // "FinancialYear",
    // "Resultat",
    // "SNIKod2",
    // "SNIKod2Description",
    // "Etablerades",
    // "EBITDA",
    // "Soliditet",
  ]);

  let [extraOptions, setExtraOptions] = useState([]);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const reducerState = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    let getData = async () => {
      // console.log("useEfffect");
      // console.log(`http://localhost:3000/api/company/${reducerState.page}/`);
      try {
        const res = await axios.post(
          `http://localhost:3000/api/company/${reducerState.page}/`,
          {
            SNI3Numbers: reducerState.customerBranchChoice,
          },
          { withCredentials: true }
        );

        if (res.statusText === "OK") {
          console.log("res.statusText === OK");
          // console.log(res.data);
          // console.log(res.data.total);
          setTotalPage(Math.ceil(res.data.total / 50));
          setAllCompanies(res.data.companies);
          dispatch(selectedCompanies(res.data));

          navigate(`/companies/${reducerState.page}`);
        }
      } catch (err) {
        console.log(err);
        // console.log("error post");
        navigate("/company");
      }
    };

    if (reducerState.page) {
      getData();
    } else {
      navigate("/company");
    }
  }, [reducerState.page]);

  useEffect(() => {
    let items = [];

    if (totalPage >= maxNum) {
      for (let number = num; number <= maxNum; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === activePage}
            onClick={() => pageHandle(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      for (let number = num; number <= totalPage; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === activePage}
            onClick={() => pageHandle(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    }

    setItemsState(items);
  }, [activePage, totalPage]);

  function pageHandle(number) {
    setActivePage(number);
    dispatch(selectedPage(number));
  }

  function prevPage() {
    // console.log(maxNum);
    // console.log(num);
    if (maxNum > 10) {
      setMaxNum(maxNum - 10);
      setNum(num - 10);
      setActivePage(num - 10);
      dispatch(selectedPage(num - 10));
    }
  }
  function nextPage() {
    // console.log("maxNum" + maxNum);
    // console.log(num);
    if (maxNum >= 10 && maxNum <= totalPage) {
      setMaxNum(maxNum + 10);
      setNum(num + 10);
      setActivePage(num + 10);
      dispatch(selectedPage(num + 10));
    }
  }

  let clickHandleProcess = (e, OrganizationOrgnr, index) => {
    let prioElement = document.getElementById(`${OrganizationOrgnr}prio`);
    let processElement = document.getElementById(`${OrganizationOrgnr}process`);
    let notProcesState = processElement.checked;
    let prioStete = prioElement.checked;

   

    if (notProcesState && prioStete) {
      processElement.checked = false;
      prioElement.checked = false;

      e.target.checked = true; }
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

  // let clickHandPrio = (e, OrganizationOrgnr, index) => {
  //   let processElement = document.getElementById(`${OrganizationOrgnr}process`);
  //   let prioElement = document.getElementById(`${OrganizationOrgnr}prio`);
  //   let prioStete = prioElement.checked;

  //   if (prioStete) processElement.checked = false;

  //   const found = extraOptions.find(
  //     (element) => element.OrganizationOrgnr === OrganizationOrgnr
  //   );

  //   if (found) {
  //     found.notProcesseState = processElement.checked;
  //     found.prioState = prioElement.checked;

  //     if (prioStete) {
  //       setExtraOptions((prev) => [
  //         ...prev.filter(
  //           (item) => item.OrganizationOrgnr !== OrganizationOrgnr
  //         ),
  //         found,
  //       ]);
  //     } else if (!prioStete && found.note) {
  //       setExtraOptions((prev) => [
  //         ...prev.filter(
  //           (item) => item.OrganizationOrgnr !== OrganizationOrgnr
  //         ),
  //         {
  //           OrganizationOrgnr: OrganizationOrgnr,
  //           note: found.note,
  //         },
  //       ]);
  //     } else if (!prioStete && !found.note) {
  //       setExtraOptions((prev) => [
  //         ...prev.filter(
  //           (item) => item.OrganizationOrgnr !== OrganizationOrgnr
  //         ),
  //       ]);
  //     }
  //   } else {
  //     setExtraOptions((prev) => [
  //       ...prev,
  //       {
  //         OrganizationOrgnr: OrganizationOrgnr,
  //         notProcesseState: processElement.checked,
  //         prioState: prioElement.checked,
  //       },
  //     ]);
  //   }
  // };

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

    // setExtraOptions((prev) => [
    //   ...prev.filter(
    //     (item) => item.OrganizationOrgnr !== OrganizationOrgnr
    //   ),
    //   {
    //     OrganizationOrgnr: OrganizationOrgnr,

    //     note: found.note,
    //   },
    // ]);
    // }

    // البحث عن رقم الشركة
    // في حال كانت مصفوفة
    // علي ان اعدل علي خيار النوت يلي فيها
    // ومن ثم حذفها القديمة من الستيت
    // واضافة الجديدة
  };
  let sendData = () => {
    console.log(reducerState.customerBranchChoice);

    /* 
jag ska bygga en sån objec
{ OrgNum:34242,
prio: true,
dontProccess: false,
note:""}

dessa OBJ ska skickas till backend med alla SNI3 som jag har redan

i backend jag ska hämta data för SNI3 och filtera med alla orgNumber för att plocka ut det företag vi vill

att lägga prio eller ej arbete eller note till dem

sedan jag kan använda find för att hitta varje företag och lägga till dessa data (prio osv.. ) till det. 







*/
  };

  return (
    <div>
      <h1>Companies</h1>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("Logins State");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <br />
      <br />
      <button type="button" onClick={sendData}>
        Skicka
      </button>
      <div className="pagination-container">
        <div>
          <Pagination>
            {/* <Pagination.First /> */}
            <Pagination.Prev onClick={prevPage} />
            {/* <Pagination.Ellipsis /> */}
            {itemsState}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next onClick={nextPage} />
            {/* <Pagination.Last /> */}
          </Pagination>
        </div>
      </div>
      <div>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              {allTaHead.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCompanies
              ? allCompanies.map(
                  (
                    {
                      OrganizationOrgnr,
                      OrganizationName,

                      //   OrganizationStreetName,
                      //   OrganizationZIPCode,
                      //   OrganisationKommun,
                      //   OrganizationCity,
                      //   OrganizationRegion,
                      //   OrganizationTelefon,
                      OrganizationWeb,
                      //   OrganizationMail,
                      OrganizationBransch,
                      //   OrganizationSNI1,
                      OrganizationEmployees,
                      OrganizationTurnover,
                      Moderbolag,

                      //   RegNumberOfDigits,
                      //   SNI2Numbers,
                      //   SNI3Numbers,
                      //   SNI4Numbers,
                      //   SNI5Numbers,
                      //   OrganizationV1W1,
                      //   Postadress,
                      //   Postnummer,
                      //   Stad,
                      //   FinancialYear,
                      //   Resultat,
                      //   SNIKod2,
                      //   SNIKod2Description,
                      //   Etablerades,
                      //   EBITDA,
                      //   Soliditet,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td> {OrganizationOrgnr}</td> */}
                      <td> {OrganizationName}</td>

                      <td>
                        <Form.Check
                          type={"checkbox"}
                          id={OrganizationOrgnr + "process"}
                          //   label="Select All"
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

                          //   checked={prioChecket}
                          //   id={"selectAll"}
                          //   label="Select All"
                          //   disabled={process}
                          //   onChange={()=>{this.checked(!prioChecket)}}
                        />
                      </td>
                      <td>
                        <Form.Control
                          id={index}
                          onChange={(e) =>
                            clickHandleNote(e, OrganizationOrgnr, index)
                          }

                          //   disabled={process}
                        />
                      </td>

                      {/* <td> {OrganizationStreetName}</td> */}
                      {/* <td> {OrganizationZIPCode}</td> */}
                      {/* <td> {OrganisationKommun}</td> */}
                      {/* <td> {OrganizationCity}</td> */}
                      {/* <td> {OrganizationRegion}</td> */}
                      {/* <td> {OrganizationTelefon}</td> */}
                      <td> {OrganizationWeb}</td>
                      {/* <td> {OrganizationMail}</td> */}
                      <td> {OrganizationBransch}</td>
                      {/* <td> {OrganizationSNI1}</td> */}
                      <td> {OrganizationEmployees}</td>
                      <td> {OrganizationTurnover}</td>
                      <td> {Moderbolag}</td>
                      {/* <td> {RegNumberOfDigits}</td> */}
                      {/* <td> {SNI2Numbers}</td> */}
                      {/* <td> {SNI3Numbers}</td> */}
                      {/* <td> {SNI4Numbers}</td> */}
                      {/* <td> {SNI5Numbers}</td> */}
                      {/* <td> {OrganizationV1W1}</td> */}
                      {/* <td> {Postadress}</td> */}
                      {/* <td> {Postnummer}</td> */}
                      {/* <td> {Stad}</td> */}
                      {/* <td> {FinancialYear}</td> */}
                      {/* <td> {Resultat}</td> */}
                      {/* <td> {SNIKod2}</td> */}
                      {/* <td> {SNIKod2Description}</td> */}
                      {/* <td> {Etablerades}</td> */}
                      {/* <td> {EBITDA}</td> */}
                      {/* <td> {Soliditet}</td> */}
                    </tr>
                  )
                )
              : ""}
          </tbody>
        </Table>
      </div>
      <div className="pagination-container">
        <div>
          <Pagination>
            {/* <Pagination.First /> */}
            <Pagination.Prev onClick={prevPage} />
            {/* <Pagination.Ellipsis /> */}
            {itemsState}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next onClick={nextPage} />
            {/* <Pagination.Last /> */}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Companies;

//  خطوات

// حفظ خيارات البرنش ورقم الصفحة الاولى في الريدوسير
// استدعاء خيارات البرنش في هذا الكومبونت
// استدعاء رقم الصفحة من الريدوسير
// نقل فانكشن الاكسيوز الى هذا الكومبوننت
// استدعاء الداتا من الاكسيوز وعرضها هنا
// وضع ازرار التالي والسابق
// عند الضغط على الزر التالي يجب تغيير رقم الصفحة في الريدوسير
// وبالتالي يفترض ان يتغير رقم الصفحة في خيار الفيتش
// اي انه سيتم جلب داتا جديدة
// وكذلك في خيار السابق
