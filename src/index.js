import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/login";
import Company from "./components/Company";
import Companies from "./components/Companies";
import NotFound from "./components/NotFound.jsx";
import Test from "./components/Test";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Register />} />
          <Route path="test" element={<Test />} />
          <Route path="company" element={<Company />} />
          <Route path="companies/:id" element={<Companies/>}  />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
