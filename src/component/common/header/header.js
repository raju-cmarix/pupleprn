import { api } from "api/Api";
import { LOGOUT_URL } from "constants/ApiUrls";
import {
  CLINICIAN,
  CLINICIAN_SIGNUP,
  FACILITY,
  FACILITY_SIGNUP,
  LOCALSTORAGEDEVICETOKEN,
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

function Example(...args) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen1((prevState) => !prevState);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = () => {
    if (user?.clinicianId) {
      navigate("/clinician/jobboard");
    } else if (user?.facilityId) {
      navigate("/facility/shiftmanagement");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
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
      redirectUrl = `${CLINICIAN_SIGNUP}/?step=${
        (user?.clinicianId?.signupStageCount || 0) + 1
      }`;
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
                      id="NotificationResponsive"
                      userId={user?.clinicianId?.id}
                    />
                    {/* <Link >
                  <Notification />
                </Link>
                <UncontrolledPopover
                  placement="bottom"
                  target="NotificationResponsive"
                  trigger="legacy"
                  id="notification"
                >
                  <PopoverBody>
                    <div className="notificatin-list">
                      <ul>
                        <li className="active">
                          <p>
                            John S. applied to your Job offer
                            <span className="d-block">
                              -Aug 10, 2022 02:10 pm
                            </span>{" "}
                          </p>
                          <Link to="/notifications" className="btn-link">
                            View Details
                          </Link>
                        </li>
                        <li className="active">
                          <p>
                            John S. applied to your Job offer
                            <span className="d-block">
                              -Aug 10, 2022 02:10 pm
                            </span>{" "}
                          </p>
                          <Link to="/notifications" className="btn-link">
                            View Details
                          </Link>
                        </li>
                        <li>
                          <p>
                            John S. applied to your Job offer
                            <span className="d-block">
                              -Aug 10, 2022 02:10 pm
                            </span>{" "}
                          </p>
                          <Link to="/notifications" className="btn-link">
                            View Details
                          </Link>
                        </li>
                        <li>
                          <p>
                            John S. applied to your Job offer
                            <span className="d-block">
                              -Aug 10, 2022 02:10 pm
                            </span>{" "}
                          </p>
                          <Link to="/notifications" className="btn-link">
                            View Details
                          </Link>
                        </li>
                        <li>
                          <p>
                            John S. applied to your Job offer
                            <span className="d-block">
                              -Aug 10, 2022 02:10 pm
                            </span>{" "}
                          </p>
                          <Link to="/notifications" className="btn-link">
                            View Details
                          </Link>
                        </li>
                      </ul>
                      <div className="text-center">
                        <Link
                          to="/notifications"
                          className="pt-btn btn-secondary pt-btn-small px-3 my-3"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  </PopoverBody>
                </UncontrolledPopover> */}
                    <Dropdown
                      isOpen={dropdownOpen1}
                      toggle={toggle2}
                      className="me-3 ms-3">
                      <DropdownToggle className="p-0 user-icon">
                        User
                      </DropdownToggle>
                      <DropdownMenu id="header-menu">
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
                {!isUserAuthenticated && (
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
                        to="/contact"
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
                  </Nav>
                )}

                {isUserAuthenticated && user?.facilityId ? (
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
                        to="/facility/shiftmanagement"
                        onClick={window.innerWidth < 767 && toggle}>
                        Shift management
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/chat-profile"
                        onClick={window.innerWidth < 767 && toggle}>
                        Chat
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/facility/settings"
                        onClick={window.innerWidth < 767 && toggle}>
                        Account Settings
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : (
                  <></>
                )}

                {isUserAuthenticated && user?.clinicianId ? (
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
                        to="/clinician/jobboard"
                        onClick={window.innerWidth < 767 && toggle}>
                        Job Board
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/clinician/dashboard"
                        onClick={window.innerWidth < 767 && toggle}>
                        My Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/chat-profile"
                        onClick={window.innerWidth < 767 && toggle}>
                        Chat
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/clinician/settings"
                        onClick={window.innerWidth < 767 && toggle}>
                        Account Settings
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : (
                  <></>
                )}

                {isUserAuthenticated && user?.roles === "admin" ? (
                  <Nav
                    className="me-auto ms-auto"
                    navbar>
                    <NavItem>
                      <NavLink
                        to="/admin/users"
                        onClick={window.innerWidth < 767 && toggle}>
                        Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/admin/shifts"
                        onClick={window.innerWidth < 767 && toggle}>
                        Confirmed shifts
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : (
                  <></>
                )}
                {/* I think it is used for showing in Desktop View -Mitul Mistry */}
                {/* render this component only on larger displays, was causing multiple notification api calls */}
                {isUserAuthenticated && window.innerWidth >= 768 ? (
                  <div className={"nav-right-side d-md-block d-none" + " "}>
                    <NotificationIcon userId={user?.clinicianId?.id} />

                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle1}>
                      <DropdownToggle className="p-0 user-icon">
                        User
                      </DropdownToggle>

                      <DropdownMenu id="header-menu">
                        {!isEmpty(user) && isUserAuthenticated && (
                          <>
                            {!user?.facilityId?.isSignupCompleted &&
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
                      <Link
                        to="/login"
                        className="login-logout">
                        Login
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

export default Example;
