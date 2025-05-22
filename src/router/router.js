import React, { useState, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "../component/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./publicRoute";
import AdminRoute from "./adminRoute";
import SignupFacility from "views/authentication/signUpFacility/SignUpFacality";
import SignupClinician from "views/authentication/signUpClinician/SignupClinician";
import FacilitySignUpSuccessful from "views/authentication/signUpFacility/SignUpSuccessful";
import ClinicianSignUpSuccessful from "views/authentication/signUpClinician/SignUpSuccessful";
import UserContext from "utils/context/UserContext";
import AuthContext from "utils/context/AuthContext";
import { isEmpty } from "radash";
import { api } from "api/Api";
import { GET_LOGIN_DATA_URL, REFRESH_TOKEN_URL } from "constants/ApiUrls";
import MainLayout from "layouts/mainLayout";
import {
  CLINICIAN_SIGNUP,
  FACILITY_SIGNUP,
  PATHTONODATAFOUND,
  RESPONSE_OK,
} from "constants/AppConstants";
import FullLayout from "layouts/fullLayout";
import NotificationsContext, {
  UnreadContext,
} from "utils/context/NotificationsContext";
import AdminClinicianAccountSetting from "views/admin/accountSettings/adminClinicianSettings/clinicianAccountSettings";
import AdminFacilityAccountSetting from "views/admin/accountSettings/adminFacilitySettings/facilityAccountSettings";
import AdminFacilityProfile from "component/userListing/adminFacilityProfile";
import SignupFinalStep from "views/authentication/signUpClinician/signupFinalStep";

const Login = React.lazy(() => import("../views/authentication/login"));
const ForgotPassword = React.lazy(() =>
  import("../views/authentication/forgotpassword")
);
const ResetPassword = React.lazy(() =>
  import("../views/authentication/resetPassword")
);
const SaveSuccessfullPassword = React.lazy(() =>
  import("../views/authentication/savesuccessfullpass")
);
const Error = React.lazy(() => import("../views/authentication/error403"));
const Error404 = React.lazy(() => import("../views/authentication/error404"));
const ClinicianLanding = React.lazy(() =>
  import("../views/others/home/clinicianLanding")
);
const FacilityLanding = React.lazy(() =>
  import("../views/others/home/facilityLanding")
);
const LandingWithoutInsta = React.lazy(() =>
  import("../views/others/home/landingWithoutInsta")
);
const Faq = React.lazy(() => import("../views/others/faq/faq"));
const PrivacyPolicy = React.lazy(() =>
  import("../views/others/privacypolicy/privacypolicy")
);
const TermCondition = React.lazy(() =>
  import("../views/others/termcondition/termcondition")
);
const FacilityAccountSetting = React.lazy(() =>
  import("../views/facility/accountSettings")
);
const ClinicianAccountSetting = React.lazy(() =>
  import("../views/clinician/accountSettings")
);
const HireList = React.lazy(() =>
  import("../views/others/hireStaff/hireStaffList")
);

const ClinicianProfile = React.lazy(() => import("../views/clinician/profile"));
const AboutUs = React.lazy(() => import("../views/others/aboutUs"));

const OurLocation = React.lazy(() => import("../views/others/ourLocation"));

const ContactUs = React.lazy(() => import("../views/others/contactUs"));
const JobPostListing = React.lazy(() => import("../views/facility/jobPosting"));
const JobApplicantListing = React.lazy(() =>
  import("../component/jobPosting/applicantList")
);
const EditJobPosting = React.lazy(() =>
  import("../views/others/editJobPosting/editjobposting")
);
const EmailCapture = React.lazy(() =>
  import("component/emailCapture/EmailCapture.js")
);
const ChatProfile = React.lazy(() =>
  import("../views/others/chatProfile/chatProfile")
);
const JobBoard = React.lazy(() => import("../component/jobBoard/jobBoard"));
const Notification = React.lazy(() =>
  import("../component/common/notification")
);
const MyDashboard = React.lazy(() =>
  import("../views/clinician/myDashboard/dashboard")
);
const ClinicianJobProfile = React.lazy(() =>
  import("../views/clinician/clinicianJobProfile")
);
const UserListing = React.lazy(() =>
  import("../views/admin/users/userListing")
);
const InvoiceListing = React.lazy(() =>
  import("../views/admin/invoice/invoiceListing")
);
const JobPosts = React.lazy(() => import("../component/userListing/jobPost"));
const JobDetail = React.lazy(() =>
  import("../component/userListing/jobDetail")
);
const ConfirmedShift = React.lazy(() =>
  import("../component/userListing/confirmedShifts")
);
const Profile = React.lazy(() =>
  import("../views/others/profile/profile/profile")
);
const FacilityProfile = React.lazy(() => import("../views/facility/profile"));
const AdminClinicianProfile = React.lazy(() =>
  import("views/admin/profiles/clinicianProfile")
);
const StripeProfile = React.lazy(() =>
  import("../views/clinician/myDashboard/stripeProfile/stripeProfile")
);
const AdminAccountSetting = React.lazy(() =>
  import(
    "../views/admin/accountSettings/adminAccountSettings/adminAccountSettings"
  )
);
const VerficationCode = React.lazy(() =>
  import("../views/authentication/VerificationForm")
);

const NoData = React.lazy(() => import(PATHTONODATAFOUND));

const AppRouter = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({});
  const [unreads, setUnreads] = useState(0);
  const [isApiCalled, setIsApiCalled] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("purplePTAuthToken");
    if (isEmpty(user) && token && token.length) {
      getUserObj();
    } else {
      setIsApiCalled(true);
    }
    if (
      !isUserAuthenticated &&
      localStorage.getItem("purplePTAuthToken") &&
      localStorage.getItem("purplePTAuthToken").length
    ) {
      setIsUserAuthenticated(true);
    } else setIsUserAuthenticated(false);
  }, []);

  const getUserObj = async () => {
    await refreshToken();
    refreshTokenInterval();

    setIsApiCalled(true);
  };

  const refreshToken = async () => {
    try {
      let token = await api(REFRESH_TOKEN_URL, {});
      setUser(token.data.data);
      localStorage.setItem("purplePTAuthToken", token?.data?.data?.token || "");
      localStorage.setItem(
        "purplePTRefreshToken",
        token?.data?.data?.refreshToken || ""
      );
      setIsUserAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("purplePTAuthToken");
      localStorage.removeItem("purplePTRefreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("2FA");
      setUser({});
      setIsUserAuthenticated(false);
    }
  };

  const refreshTokenInterval = () => {
    let id = localStorage.getItem("PURPTID");
    if (id) {
      clearInterval(id);
    }

    let timeOutId = setInterval(() => {
      refreshToken();
    }, 55 * 60000);

    localStorage.setItem("PURPTID", timeOutId);
  };

  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated }}
    >
      <UserContext.Provider value={{ user, setUser, refreshTokenInterval }}>
        <NotificationsContext.Provider
          value={{ notifications, setNotifications }}
        >
          <UnreadContext.Provider value={{ unreads, setUnreads }}>
            <Suspense fallback={<Loader />}>
              {isApiCalled && (
                <Routes>
                  <Route
                    path="/"
                    // element={
                    //   <MainLayout>
                    //     <LandingWithoutInsta />
                    //   </MainLayout>
                    // }
                    element={
                      isUserAuthenticated && user.status === 'approved' && user.isApprovedByAdmin === true && user.roles === 'facility' ? (
                        <Navigate to="/facility/shiftmanagement" />
                      ) : (
                          <MainLayout>
                         <LandingWithoutInsta />
                        </MainLayout>
                      )
                    }

                  />
                  <Route
                    path="/403"
                    exact
                    element={
                      <MainLayout>
                        <Error />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/no-data"
                    exact
                    element={
                      <MainLayout>
                        <NoData />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/qr"
                    exact
                    element={<Navigate to="/newsletter" />}
                  />
                  <Route
                    path="/email"
                    exact
                    element={<Navigate to="/newsletter" />}
                  />
                  <Route
                    path="/newsletter"
                    exact
                    element={
                      <MainLayout>
                        <EmailCapture />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/facility"
                    exact
                    element={
                      <MainLayout>
                        <FacilityLanding />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/clinician"
                    exact
                    element={
                      <MainLayout>
                        <ClinicianLanding />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/faq"
                    exact
                    element={
                      <MainLayout>
                        <Faq />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/privacy"
                    exact
                    element={
                      <MainLayout>
                        <PrivacyPolicy />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/terms"
                    exact
                    element={
                      <MainLayout>
                        <TermCondition />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/contactus"
                    exact
                    element={
                      <MainLayout>
                        <ContactUs />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/aboutus"
                    exact
                    element={
                      <MainLayout>
                        <AboutUs />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/findus"
                    exact
                    element={
                      <MainLayout>
                        <OurLocation />
                      </MainLayout>
                    }
                  />
                  {/* Routes to show when not login */}
                  <Route
                    path="/login"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  {/* <Route
                    path="/admin/verification"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <VerficationCode />
                      </PublicRoute>
                    }
                  /> */}
                  <Route
                    path="/password/forgot"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <ForgotPassword />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/password/reset"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <ResetPassword />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/password/changed"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <SaveSuccessfullPassword />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={FACILITY_SIGNUP}
                    exact
                    element={
                      <FullLayout>
                        <SignupFacility />
                      </FullLayout>
                    }
                  />
                  <Route
                    path="/facility/signup/success"
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <FacilitySignUpSuccessful />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={CLINICIAN_SIGNUP + "/success"}
                    exact
                    element={
                      <PublicRoute fullLayout>
                        <ClinicianSignUpSuccessful />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={CLINICIAN_SIGNUP + "/finalStep"}
                    exact
                    element={
                      <FullLayout>
                        <SignupFinalStep />
                      </FullLayout>
                    }
                  />
                  <Route
                    path={CLINICIAN_SIGNUP}
                    exact
                    element={
                      <FullLayout>
                        <SignupClinician />
                      </FullLayout>
                    }
                  />
                  {/* facility routes */}
                  {/* {user && ROLE_FACILITY.includes(user.roles) && (
                <> */}
                  <Route
                    path="/facility/settings"
                    exact
                    element={
                      <PrivateRoute>
                        <FacilityAccountSetting />
                      </PrivateRoute>
                    }
                  />
                  {/* </>
              )} */}
                  <Route
                    path="/facility/clinicianprofile/:id"
                    exact
                    element={
                      <MainLayout>
                        <FacilityProfile />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/admin/facility/clinicianprofile/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <AdminFacilityProfile />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/hire-staff"
                    exact
                    element={
                      <MainLayout>
                        <HireList />
                      </MainLayout>
                    }
                  />
                  {/* clinician routes */}
                  {/* {user && ROLE_CLINICIAN.includes(user.roles) && (
                <> */}
                  <Route
                    path="/clinician/profile"
                    exact
                    element={
                      <PrivateRoute>
                        <ClinicianProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/clinician/settings"
                    exact
                    element={
                      <PrivateRoute>
                        <ClinicianAccountSetting />
                      </PrivateRoute>
                    }
                  />
                  {/* </>
              )} */}
                  <Route
                    path="/clinician/jobboard"
                    exact
                    element={
                      <MainLayout>
                        <JobBoard />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/clinician/jobprofile/:id"
                    exact
                    element={
                      <MainLayout>
                        <ClinicianJobProfile />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/clinician/dashboard"
                    exact
                    element={
                      <MainLayout>
                        <MyDashboard />
                      </MainLayout>
                    }
                  />
                  {/* admin routes */}
                  {/* {user && ROLE_ADMIN.includes(user.roles) && (
                <> */}
                  <Route
                    path="/facility/shiftmanagement"
                    exact
                    element={
                      <MainLayout>
                        <JobPostListing />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/admin/users"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <UserListing />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/verification"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <VerficationCode />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/cliniciandetails/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <AdminClinicianAccountSetting />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/clinicianprofile/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <AdminClinicianProfile />
                      </AdminRoute>
                    }
                  />
                  {/* </>
              )} */}
                  <Route
                    path="/admin/jobs"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <JobPosts />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/shifts"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <ConfirmedShift />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/invoice"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <InvoiceListing />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/facilitydetails/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <AdminFacilityAccountSetting />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/settings"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <AdminAccountSetting />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    exact
                    element={
                      <MainLayout>
                        <Profile />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/facility/applicants"
                    exact
                    element={
                      <MainLayout>
                        <JobApplicantListing />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/facility/jobprofile/:id"
                    exact
                    element={
                      <MainLayout>
                        <EditJobPosting />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/chat-profile"
                    exact
                    element={
                      <MainLayout>
                        <ChatProfile />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/notifications"
                    exact
                    element={
                      <MainLayout>
                        <Notification />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/admin/jobdetails/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <StripeProfile />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/jobdetail/:id"
                    exact
                    element={
                      <AdminRoute adminLayout>
                        <JobDetail />
                      </AdminRoute>
                    }
                  />
                  {/* {user &&
                (isUserAuthenticated === true ||
                  isUserAuthenticated === false) && ( */}
                  <Route path="*" exact element={<Error404 />} />
                  {/* )} */}
                </Routes>
              )}
            </Suspense>
          </UnreadContext.Provider>
        </NotificationsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppRouter;
