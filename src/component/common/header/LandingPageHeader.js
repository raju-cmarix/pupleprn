import { api } from "api/Api";
import { LOGOUT_URL } from "constants/ApiUrls";
import {
  ADMIN,
  ApplyToWork,
  CLINICIAN,
  CLINICIAN_SIGNUP,
  FACILITY,
  FACILITY_SIGNUP,
  HireStaff,
  LOCALSTORAGEDEVICETOKEN,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
  SUBADMIN,
  VERIFICATION_REQUIRED,
} from "constants/AppConstants";
import { isEmpty } from "radash";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import { ReactComponent as Logo } from "../../../assets/images/logo/new-logo.svg";
import NotificationIcon from "../Notifications/NotificationIcon";
import "./header.scss";

function LandingPageHeader(...args) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen1((prevState) => !prevState);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const HS = HireStaff(isUserAuthenticated);
  const AW = ApplyToWork(isUserAuthenticated);
  const role = localStorage.getItem("userRole");
  const handleClick = () => {
    if (user?.clinicianId) {
      navigate("/clinician/jobboard");
    } else if (user?.facilityId) {
      navigate("/facility/shiftmanagement");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    const category = "User Interaction";
    const action = "Click";
    const label = "Log out";

    window.dataLayer.push({
      event: "log out",
      eventProps: {
        category: category,
        action: action,
        label: label,
      },
    });
    const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
    localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
    api(LOGOUT_URL, {
      id: user.subUserId || user.id,
      roles: user.roles,
      deviceToken: deviceToken && deviceToken !== "null" ? deviceToken : null,
    }).then((res) => {
      setUser({});
      setIsUserAuthenticated(false);
      localStorage.removeItem("purplePTAuthToken");
      localStorage.removeItem("purplePTRefreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("2FA");
      let id = localStorage.getItem("PURPTID");
      if (id) {
        clearInterval(id);
      }
      navigate("/");
    });
  };

  let redirectUrl = "";

  if (user && user?.roles) {
    if (user?.roles === FACILITY) {
      redirectUrl = `${FACILITY_SIGNUP}/?step=${
        (user?.facilityId?.signupStageCount || 0) + 1
      }`;
    }

    if (user?.roles === CLINICIAN || user?.clinicianId) {
      redirectUrl = `${CLINICIAN_SIGNUP}/?step=1`;
      //  ${user?.clinicianId?.signupStageCount + 1}`;
    }
  }

  const isPrivacyPage = location.pathname === "/privacy";
  const isTermsAndConditions = location.pathname === "/terms";

  return (
    <>
      {(isPrivacyPage || isTermsAndConditions) && isMobile ? (
        <div className="landing-navbar">
          <div className="custom-container">
            <Navbar
              {...args}
              expand="md"
              className="pt-4">
              <span
                onClick={handleClick}
                className="cursor-pointer">
                <Logo />
              </span>
            </Navbar>
          </div>
        </div>
      ) : (
        <div className="landing-navbar">
          <div className="custom-container">
            <Navbar
              {...args}
              expand="md"
              className="pt-4">
              <span
                onClick={handleClick}
                className="cursor-pointer">
                <Logo />
              </span>

              {/* render this component only on mobile, was causing multiple notification api calls */}
              {window.innerWidth < 768 && (
                <div className="d-flex align-items-center">
                  <div className="nav-right-side d-block d-md-none">
                    <NotificationIcon
                      className="me-3 d-none"
                      id="NotificationResponsive"
                    />

                    <Dropdown
                      isOpen={dropdownOpen1}
                      toggle={toggle2}
                      className="me-3 ms-0">
                      <DropdownToggle className="p-0 user-icon">
                        user
                      </DropdownToggle>
                      <DropdownMenu id="header-menu">
                        {!isEmpty(user) && isUserAuthenticated && (
                          <>
                            {user?.roles !== ADMIN &&
                              !user?.facilityId?.isSignupCompleted &&
                              !user?.clinicianId?.isSignupCompleted && (
                                <DropdownItem
                                  tag={Link}
                                  to={redirectUrl}
                                  className="login-logout dropdown-item p-0">
                                  Complete Signup
                                </DropdownItem>
                              )}
                          </>
                        )}
                        {isUserAuthenticated ? (
                          <DropdownItem
                            tag={"a"}
                            className="login-logout"
                            onClick={() =>
                              isUserAuthenticated && handleLogout()
                            }>
                            {"Logout"}
                          </DropdownItem>
                        ) : (
                          <DropdownItem
                            tag={Link}
                            to="/login"
                            className="login-logout">
                            {"Login"}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <NavbarToggler onClick={toggle} />
                </div>
              )}

              <Collapse
                isOpen={isOpen}
                navbar>
                <Nav
                  className="me-auto ms-auto"
                  navbar>
                  <button
                    onClick={toggle}
                    className="pt-btn-icon btn-primary d-md-none">
                    X
                  </button>
                  <NavItem>
                    <NavLink
                      to="/clinician"
                      onClick={window.innerWidth < 767 && toggle}>
                      For Clinicians
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/facility"
                      onClick={window.innerWidth < 767 && toggle}>
                      For Facilities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/contactus"
                      onClick={window.innerWidth < 767 && toggle}>
                      Contact Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/faq"
                      onClick={window.innerWidth < 767 && toggle}>
                      FAQ
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/aboutus"
                      onClick={window.innerWidth < 767 && toggle}>
                      About Us
                    </NavLink>
                  </NavItem>
                  {!isUserAuthenticated && (
                    <NavItem className={"login-nav"}>
                      <NavLink
                        to="/login"
                        onClick={window.innerWidth < 767 && toggle}>
                        Login
                      </NavLink>
                    </NavItem>
                  )}
                  {VERIFICATION_REQUIRED(
                    user,
                    toggle,
                    isUserAuthenticated,
                    redirectUrl,
                    user?.facilityId?.isSignupCompleted ||
                      user?.clinicianId?.isSignupCompleted,
                  )}
                </Nav>

                {isUserAuthenticated ? (
                  <>
                    <>
                      {(user?.roles === "admin" || role === "subadmin") && (
                        <Nav
                          className="me-auto ms-auto"
                          navbar>
                          <NavItem>
                            <Link to="/admin/users">Users</Link>
                          </NavItem>
                          <NavItem>
                            <Link to="/admin/jobs">Job Posts</Link>
                          </NavItem>
                          <NavItem>
                            <Link to="/admin/shifts">Confirmed shifts</Link>
                          </NavItem>
                          <NavItem>
                          {user?.roles === "admin" ? (
                            <Link to="/admin/invoice">Invoices</Link>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </NavItem>
                          {/* <NavItem>
                            <Link to="/admin/invoice">Invoices</Link>
                          </NavItem> */}
                        </Nav>
                      )}
                    </>
                    {/* <>
                    {role === "subadmin" && (
                      <Nav className="me-auto ms-auto" navbar>
                        <NavItem>
                          <Link to="/admin/users">Users</Link>
                        </NavItem>
                      </Nav>
                    )}
                  </> */}
                    <>
                      {ROLE_CLINICIAN.includes(user?.roles) &&
                        user?.isApprovedByAdmin && (
                          <Nav
                            className="me-auto ms-auto"
                            navbar>
                            <NavItem>
                              <Link to="/clinician/jobboard">Job Board</Link>
                            </NavItem>
                            <NavItem>
                              <Link to="/clinician/dashboard">
                                My Dashboard
                              </Link>
                            </NavItem>
                            <NavItem>
                              <Link to="/chat-profile">Chat</Link>
                            </NavItem>
                            <NavItem>
                              <Link to="/clinician/settings">
                                Account Settings
                              </Link>
                            </NavItem>
                          </Nav>
                        )}
                    </>
                    <>
                      {ROLE_FACILITY.includes(user?.roles) &&
                        user?.isApprovedByAdmin && (
                          <Nav
                            className="me-auto ms-auto"
                            navbar>
                            <NavItem>
                              <Link to="/facility/shiftmanagement">
                                Shift management
                              </Link>
                            </NavItem>
                            <NavItem>
                              <Link to="/chat-profile">Chat</Link>
                            </NavItem>
                            <NavItem>
                              <NavLink to="/facility/settings">
                                Account Settings
                              </NavLink>
                            </NavItem>
                          </Nav>
                        )}
                    </>
                  </>
                ) : (
                  <></>
                )}

                {/* I think it is used for showing in Desktop View -Mitul Mistry */}
                {/* render this component only on larger displays, was causing multiple notification api calls */}
                {isUserAuthenticated && window.innerWidth >= 768 ? (
                  <div className={"nav-right-side d-md-block min-50" + " "}>
                    <NotificationIcon />

                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle1}>
                      <DropdownToggle className="p-0 user-icon">
                        User
                      </DropdownToggle>

                      <DropdownMenu id="header-menu">
                        {!isEmpty(user) && isUserAuthenticated && (
                          <>
                            {user?.roles !== ADMIN &&
                              user?.roles !== SUBADMIN &&
                              !user?.facilityId?.isSignupCompleted &&
                              !user?.clinicianId?.isSignupCompleted && (
                                <DropdownItem
                                  tag={Link}
                                  to={redirectUrl}
                                  className="login-logout dropdown-item p-0">
                                  Complete Signup
                                </DropdownItem>
                              )}
                          </>
                        )}
                        {(user?.roles === ADMIN ||
                          user?.roles === "subadmin") && (
                          <DropdownItem
                            tag={Link}
                            to={"/admin/settings"}
                            className="login-logout dropdown-item p-0">
                            Account Settings
                          </DropdownItem>
                        )}
                        <DropdownItem
                          tag={"a"}
                          className="login-logout dropdown-item p-0 cursor-pointer"
                          onClick={() => handleLogout()}
                          id="logout">
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                ) : (
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle1}>
                    <DropdownToggle className="p-0 user-icon">
                      User
                    </DropdownToggle>
                    <DropdownMenu id="header-menu">
                      {/* <Link to="/login" className="login-logout" id="login">
                      Login
                    </Link> */}
                      <Link
                        to="/facility/signup"
                        className="login-logout"
                        id="facility">
                        {HS}
                      </Link>
                      <Link
                        to="/clinician/signup"
                        className="login-logout"
                        id="clinician">
                        {AW}
                      </Link>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </Collapse>
            </Navbar>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPageHeader;
