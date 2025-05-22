import { ToastContainer } from "react-toastify";
import "./assets/scss/App.scss";
import Routers from "./router/router";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const CLIENT_MEASUREMENT_ID = "G-28QKCGPKSM";

ReactGA.initialize([
  {
    trackingId: CLIENT_MEASUREMENT_ID,
  },
]);

const App = () => {
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: PageTitle,
  });

  return (
    <div className="App">
      <Routers />
      <ToastContainer newestOnTop />
    </div>
  );
};

export default App;
