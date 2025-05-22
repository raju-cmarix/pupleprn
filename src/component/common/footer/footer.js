import { Link, NavLink } from "react-router-dom";
import { Col, Nav, NavItem, Row } from "reactstrap";
import { ReactComponent as Logo } from "../../../assets/images/logo/new-logo.svg";
import {
  FooterFacebook,
  FooterInstagram,
  FooterMail,
  Footercall,
} from "../../../assets/svg";

import ConditionalLinks from "../ConditionalLinks";
import "./footer.scss";

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="custom-container">
          <Row>
            <Col
              lg="7"
              md="7"
              className="logosection">
              <div className="footerlogo">
                <div className="foot-logo">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
                <div className="footcall">
                  <a href="tel:832-800-3437">
                    <span>
                      <Footercall />
                    </span>
                    832-800-3437
                  </a>
                </div>
                <div className="footmail">
                  <a href="mailto:contact@PurplePRN.com">
                    <span>
                      <FooterMail />
                    </span>
                    contact@PurplePRN.com
                  </a>
                </div>
                <div className="socialicons">
                  <Nav navbar>
                    <NavItem>
                      <a
                        rel="noreferrer"
                        href="https://www.instagram.com/purpleprn"
                        target="_blank">
                        <FooterInstagram />
                      </a>
                    </NavItem>
                    <NavItem>
                      <a
                        rel="noreferrer"
                        href="https://www.facebook.com/purpleprn"
                        target="_blank">
                        <FooterFacebook />
                      </a>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <div className="cities-name">
                <h3 className="fw700">Cities where we work</h3>
                <Nav
                  navbar
                  className="cities-list">
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Houston
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      San Antonio
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Miami-Ft. Lauderdale
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Austin
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Phoenix
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Dallas
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Chicago
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Atlanta
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Philadelphia
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Florida Panhandle
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Fort Worth
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/findus"
                      onClick={() => window.scrollTo(0, 0)}>
                      Tucson
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col
              lg="5"
              md="5"
              className="footer-rt">
              <div className="footer-menu">
                <div className="about-menu">
                  <div className="footmenu-box">
                    <h3 className="fw700">About</h3>
                    <Nav
                      navbar
                      className="aboutmenu-list">
                      <NavItem>
                        <NavLink
                          to="/aboutus"
                          onClick={() => window.scrollTo(0, 0)}>
                          About Us
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to="/?tag=features">Features</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="/newsletter"
                          onClick={() => window.scrollTo(0, 0)}>
                          Newsletters
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
                <div className="foot-menu">
                  <div className="footmenu-box">
                    <h3 className="fw700">Menu</h3>
                    <Nav
                      navbar
                      className="aboutmenu-list">
                      <NavItem>
                        <NavLink
                          to="/"
                          onClick={() => window.scrollTo(0, 0)}>
                          Home
                        </NavLink>
                      </NavItem>

                      <ConditionalLinks
                        type={"navLink"}
                        role="cli"
                      />

                      <ConditionalLinks
                        type={"navLink"}
                        role="fac"
                      />
                    </Nav>
                  </div>
                </div>
                <div className="Support-menu">
                  <div className="footmenu-box">
                    <h3 className="fw700">Support</h3>
                    <Nav
                      navbar
                      className="aboutmenu-list">
                      <NavItem>
                        <NavLink
                          to="/faq"
                          onClick={() => window.scrollTo(0, 0)}>
                          FAQs
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="/contactus"
                          onClick={() => window.scrollTo(0, 0)}>
                          Contact Us
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="footercopyright-section">
          <div className="custom-container">
            <Row>
              <Col className="footer-copy">
                <p>
                  <NavLink
                    to="/"
                    onClick={() => window.scrollTo(0, 0)}>
                    Purple PRN
                  </NavLink>{" "}
                  © {new Date().getFullYear()} All rights Reserved
                </p>
                <div className="foot-privacy-term">
                  <Nav
                    navbar
                    className="privacy-term">
                    <NavItem>
                      <NavLink
                        to="/privacy"
                        onClick={() => window.scrollTo(0, 0)}>
                        Privacy Policy
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="/terms"
                        onClick={() => window.scrollTo(0, 0)}>
                        Terms & Conditions
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
