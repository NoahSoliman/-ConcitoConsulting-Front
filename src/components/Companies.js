import React from "react";
import "./Companies.css";

import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Form,
  Pagination,
  PageItem,
  Table,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import CheckOptions from "./CheckOptions";
import PageCompaniesState from "./PageCompaniesState";

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
  const [show, setShow] = useState(false);
  const [allTaHead, setAllTaHead] = useState([
    // "OrganizationOrgnr",
    "Organization Name",
    "Bearbeta ej",
    "PRIO",
    "Ev. Not till Concito",
    // "OrganizationStreetName",
    // "OrganizationZIPCode",
    // "OrganisationKommun",
    // "OrganizationCity",
    // "OrganizationRegion",
    // "OrganizationTelefon",
    "Org. Web",
    // "OrganizationMail",
    "Org. Bransch",
    // "OrganizationSNI1",
    "Org. Employees",
    "Org. Turnover",
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
          // console.log("res.statusText === OK");
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
    // för att inte visa mer än tio sidor nummer "maxNum"
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

  // ------------------------------------------------------------------------------

  let sendData = async () => {
    // console.log(reducerState.customerBranchChoice);
    // console.log(reducerState.customerOptions);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/company/result`,

        {
          test: "test",
          customerBranchChoice: reducerState.customerBranchChoice,
          customerOptions: reducerState.customerOptions,
        },
        { withCredentials: true }
      );

      if (res.statusText === "OK") {
        console.log(res);
        setShow(true)
 
      }
    } catch (err) {
      console.log(err);

      alert("Vi har ett problem just nu med server! Försök gärna efter en stund!")
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Companies</h1>
        <div className="button-container">
          <Button
            type="button"
            className="button-form"
            onClick={() => {
              localStorage.removeItem("Logins State");
              navigate("/login");
            }}
            variant="outline-light"
          >
            Logout
          </Button>
          <Button
            variant="outline-light"
            type="button"
            className="button-form"
            onClick={() => {
              navigate("/company");
            }}
          >
            Gå tillbaka till Branschöversikt!
          </Button>
        </div>
      </header>

    
      <Alert show={show} variant="success" style={{padding:"100px"  }}>
        <Alert.Heading>Vi har fått dina val nu! </Alert.Heading>
        <p>
        Vill du göra några ändringar eller bara dubbelkolla det du har skickat till oss? klick gärna då på knappen ändra mina val. Tack!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
          Ändra mina val! 
          </Button>
        </div>
      </Alert>
      

      {!show && <>
      <div className="pagination-container">
        <div className="companies-container">
          <Button type="button" onClick={sendData} className="button-form">
            Skicka dina val!
          </Button>
          <Pagination className="Pagination">
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
        <Table className="table-responsive " responsive striped bordered hover>
          <thead  className="th-contanier">
            <tr>
              <th>#</th>
              {allTaHead.map((title, index) => (
                <th className="th-title" key={index}>{title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <PageCompaniesState allCompanies={allCompanies} />
          </tbody>
        </Table>
      </div>

      <div className="pagination-container">
        <div className="companies-container">
          <Button type="button" onClick={sendData} className="button-form">
            Skicka dina val!
          </Button>
          <Pagination className="Pagination">
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
      </>}
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

// {allCompanies
//   ? allCompanies.map(
//       (
//         {
//           OrganizationOrgnr,
//           OrganizationName,

//           //   OrganizationStreetName,
//           //   OrganizationZIPCode,
//           //   OrganisationKommun,
//           //   OrganizationCity,
//           //   OrganizationRegion,
//           //   OrganizationTelefon,
//           OrganizationWeb,
//           //   OrganizationMail,
//           OrganizationBransch,
//           //   OrganizationSNI1,
//           OrganizationEmployees,
//           OrganizationTurnover,
//           Moderbolag,

//           //   RegNumberOfDigits,
//           //   SNI2Numbers,
//           //   SNI3Numbers,
//           //   SNI4Numbers,
//           //   SNI5Numbers,
//           //   OrganizationV1W1,
//           //   Postadress,
//           //   Postnummer,
//           //   Stad,
//           //   FinancialYear,
//           //   Resultat,
//           //   SNIKod2,
//           //   SNIKod2Description,
//           //   Etablerades,
//           //   EBITDA,
//           //   Soliditet,
//         },
//         index
//       ) => (
//         <tr key={index}>
//           <td>{index + 1}</td>
//           <td> {OrganizationName}</td>

//           <td>
//             <Form.Check
//               type={"checkbox"}
//               id={OrganizationOrgnr + "process"}
//               // onClick={(e) =>
//               // clickHandleProcess(e, OrganizationOrgnr, index)
//               // }
//             />
//           </td>
//           <td>
//             <Form.Check
//               type={"checkbox"}
//               id={OrganizationOrgnr + "prio"}
//               // onClick={(e) =>
//               // clickHandleProcess(e, OrganizationOrgnr, index)
//               // }
//             />
//           </td>
//           <td>
//             <Form.Control
//             // onChange={(e) =>
//             // clickHandleNote(e, OrganizationOrgnr, index)
//             // }

//             //   disabled={process}
//             />
//           </td>
//           {/* <td> {OrganizationStreetName}</td> */}
//           {/* <td> {OrganizationZIPCode}</td> */}
//           {/* <td> {OrganisationKommun}</td> */}
//           {/* <td> {OrganizationCity}</td> */}
//           {/* <td> {OrganizationRegion}</td> */}
//           {/* <td> {OrganizationTelefon}</td> */}
//           <td> {OrganizationWeb}</td>
//           {/* <td> {OrganizationMail}</td> */}
//           <td> {OrganizationBransch}</td>
//           {/* <td> {OrganizationSNI1}</td> */}
//           <td> {OrganizationEmployees}</td>
//           <td> {OrganizationTurnover}</td>
//           <td> {Moderbolag}</td>
//           {/* <td> {RegNumberOfDigits}</td> */}
//           {/* <td> {SNI2Numbers}</td> */}
//           {/* <td> {SNI3Numbers}</td> */}
//           {/* <td> {SNI4Numbers}</td> */}
//           {/* <td> {SNI5Numbers}</td> */}
//           {/* <td> {OrganizationV1W1}</td> */}
//           {/* <td> {Postadress}</td> */}
//           {/* <td> {Postnummer}</td> */}
//           {/* <td> {Stad}</td> */}
//           {/* <td> {FinancialYear}</td> */}
//           {/* <td> {Resultat}</td> */}
//           {/* <td> {SNIKod2}</td> */}
//           {/* <td> {SNIKod2Description}</td> */}
//           {/* <td> {Etablerades}</td> */}
//           {/* <td> {EBITDA}</td> */}
//           {/* <td> {Soliditet}</td> */}
//         </tr>
//       )
//     )
//   : ""}

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

//
