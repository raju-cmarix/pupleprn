import { api } from "api/Api";
import { POST_CUSTOM_PIXEL_PAGE_VIEW } from "constants/ApiUrls";
import { FBEventCookies } from "constants/AppConstants";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageEvent = () => {
  const location = useLocation();
  const path = location?.pathname;

  const pageEvents = {
    "/": "LandingPage",
    "/clinician": "ClinicianLanding",
    "/facility": "FacilityLanding",
    "/facility/signup": "FacilityRegistrationStep1",
    "/clinician/signup": "ClinicianRegistrationStep1",
  };

  const APICall = async () =>
    await api(POST_CUSTOM_PIXEL_PAGE_VIEW, {
      eventName: pageEvents[path],
      ...FBEventCookies,
    });

  useEffect(() => APICall(), []);
};

export default usePageEvent;
