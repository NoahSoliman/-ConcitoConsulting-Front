import React from "react";

import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Form, Pagination, PageItem, Table } from "react-bootstrap";

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
  const [allTaHead, setAllTaHead] = useState([

    "OrganizationOrgnr",
    "OrganizationName",
    "OrganizationStreetName",
    "OrganizationZIPCode",
    "OrganisationKommun",
    "OrganizationCity",
    "OrganizationRegion",
    "OrganizationTelefon",
    "OrganizationWeb",
    "OrganizationMail",
    "OrganizationBransch",
    "OrganizationSNI1",
    "OrganizationEmployees",
    "OrganizationTurnover",
    "RegNumberOfDigits",
    "SNI2Numbers",
    "SNI3Numbers",
    "SNI4Numbers",
    "SNI5Numbers",
    "OrganizationV1W1",
    "Postadress",
    "Postnummer",
    "Stad",
    "FinancialYear",
    "Resultat",

  ]);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const reducerState = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    let getData = async () => {
      console.log("useEfffect");
      console.log(`http://localhost:3000/api/company/${reducerState.page}/`);
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
          console.log(res.data);
          console.log(res.data.total);
          setTotalPage(Math.ceil(res.data.total / 50));
          setAllCompanies(res.data.companies);
          dispatch(selectedCompanies(res.data));

          navigate(`/companies/${reducerState.page}`);
        }
      } catch (err) {
        console.log(err);
        console.log("error post");
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
    console.log(maxNum);
    console.log(num);
    if (maxNum > 10) {
      setMaxNum(maxNum - 10);
      setNum(num - 10);
      setActivePage(num - 10);
      dispatch(selectedPage(num - 10));
    }
  }
  function nextPage() {
    console.log("maxNum" + maxNum);
    console.log(num);
    if (maxNum >= 10 && maxNum <= totalPage) {
      setMaxNum(maxNum + 10);
      setNum(num + 10);
      setActivePage(num + 10);
      dispatch(selectedPage(num + 10));
    }
  }

  return (
    <div>
      <h1>Companies</h1>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {allTaHead.map((title, index) => (
                  
                <th key={index}>{title}</th>
              ))}  
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>

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
