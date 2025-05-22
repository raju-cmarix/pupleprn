import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-range-slider-input/dist/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n/i18n";
import { history } from "./history";
import "./assets/scss/variable.scss";
import "flatpickr/dist/themes/material_green.css";
import ScrollToTop from "component/common/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18n}> */}
    <BrowserRouter history={history} basename={process.env.REACT_APP_BASENAME}>
      <ScrollToTop />
      <App />
    </BrowserRouter>
    {/* </I18nextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if (
//   window.location.pathname === '/' ||
//   window.location.pathname === `${process.env.REACT_APP_BASENAME}` ||
//   window.location.pathname === `${process.env.REACT_APP_BASENAME}`
// ) {
//   history.push(`${process.env.REACT_APP_BASENAME}`);
// }
