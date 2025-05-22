import { api } from "api/Api";
import { ReactComponent as Logo } from "assets/images/logo/new-logo.svg";
import NotificationIcon from "component/common/Notifications/NotificationIcon";
import { LOGOUT_URL } from "constants/ApiUrls";
import { LOCALSTORAGEDEVICETOKEN } from "constants/AppConstants";
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
import "./adminHeader.scss";

function Example({ ...args }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => setDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen1((prevState) => !prevState);

  const navigate = useNavigate();
  const location = useLocation();
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);

  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    const deviceToken = localStorage.getItem(LOCALSTORAGEDEVICETOKEN);
    localStorage.removeItem(LOCALSTORAGEDEVICETOKEN);
    api(LOGOUT_URL, {
      id: user.id,
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
      navigate("/login");
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              <Link to="/">
                <Logo />
              </Link>
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
              <Link to="/">
                <Logo />
              </Link>
              {/* render this component only on mobile, was causing multiple notification api calls */}
              {window.innerWidth < 768 && (
                <div className="d-flex align-items-center">
                  <div className="nav-right-side d-block d-md-none">
                    <NotificationIcon
                      className="me-3 wellicon"
                      id="NotificationResponsive"
                    />
                    <Dropdown
                      isOpen={dropdownOpen1}
                      toggle={toggle2}
                      className="me-3 ms-0">
                      <DropdownToggle className="p-0 user-icon">
                        User
                      </DropdownToggle>
                      <DropdownMenu id="header-menu">
                        <DropdownItem
                          tag={Link}
                          to={"/admin/settings"}
                          className="login-logout pointer">
                          Account Settings
                        </DropdownItem>
                        <DropdownItem
                          tag={Link}
                          className="login-logout"
                          onClick={() => handleLogout()}>
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <NavbarToggler onClick={toggle} />
                </div>
              )}
              <Collapse
                isOpen={isOpen}
                navbar>
                {/* {isUserAuthenticated && role === "admin" ? ( */}
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
                      to="/admin/users"
                      onClick={window.innerWidth < 767 && toggle}>
                      Users
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/admin/jobs"
                      onClick={window.innerWidth < 767 && toggle}>
                      Job Posts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/admin/shifts"
                      onClick={window.innerWidth < 767 && toggle}>
                      Confirmed shifts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {user.roles !== "subadmin" && (
                      <NavLink
                        to="/admin/invoice"
                        onClick={window.innerWidth < 767 && toggle}>
                        Invoices
                      </NavLink>
                    )}
                  </NavItem>
                </Nav>
                {/*) : isUserAuthenticated && user?.roles === "subadmin" ? (
                <Nav className="me-auto ms-4 " navbar>
                  <button
                    onClick={toggle}
                    className="pt-btn-icon btn-primary d-md-none"
                  >
                    X
                  </button>
                  <NavItem>
                    <Link
                      to="/admin/users"
                      onClick={window.innerWidth < 767 && toggle}
                    >
                      Users
                    </Link>
                  </NavItem>
                </Nav>
              ) : null} */}

                {/* render this component only on larger displays, was causing multiple notification api calls */}
                {window.innerWidth >= 768 && (
                  <div className="nav-right-side d-none d-md-block">
                    <NotificationIcon id="PopoverLegacy" />
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle1}>
                      <DropdownToggle className="p-0 user-icon">
                        User
                      </DropdownToggle>

                      {isUserAuthenticated ? (
                        <DropdownMenu id="header-menu">
                          <DropdownItem
                            tag={Link}
                            to={"/admin/settings"}
                            className="login-logout pointer">
                            Account Settings
                          </DropdownItem>
                          <Link
                            onClick={() => handleLogout()}
                            className="login-logout pointer">
                            Logout
                          </Link>
                        </DropdownMenu>
                      ) : (
                        <DropdownMenu id="header-menu">
                          <Link
                            to="/login"
                            className="login-logout">
                            Login
                          </Link>
                        </DropdownMenu>
                      )}
                    </Dropdown>
                  </div>
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
