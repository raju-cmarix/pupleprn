import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./ourLocation.scss";
import locationMap from "../../assets/images/icons/findus-map.png";

function LocationHead() {
  return (
    <>
      <div className="findus">
        <div className="custom-container">
          <Row className="locations">
            <Col
              md={5}
              className="find-us">
              <h2>
                Find <span>Us</span>
              </h2>
              <p>
                We’re working hard to expand to cities across the country. If
                you’re interested in bringing Purple PRN to your city, click the
                link below.
              </p>

              <div className="findus-btn">
                <Link
                  type="submit"
                  to="/contactus"
                  className="pt-btn pt-btn-small btn-primary">
                  Get In Touch!
                </Link>
              </div>
            </Col>
            <Col
              md={7}
              className="findus-img text-right">
              <img
                src={locationMap}
                className="LocationMap img-fluid"
                alt="LocationMap"
              />
            </Col>
          </Row>
          <div className="bottom-location">
            <ul className="location-list">
              <li>Current Area</li>
              <li>Coming Soon</li>
            </ul>
            <div className="city-loctions">
              <h2>Cities</h2>
              <div className="cities-list">
                <div className="city-list">
                  <h3>Houston</h3>
                  {/* <ul>
                    <li>Texas</li>
                    <ul>
                      <li>Tomball</li>
                      <li>Sugar Land</li>
                      <li>Pearland</li>
                    </ul>
                  </ul> */}
                </div>
                <div className="city-list">
                  <h3>Austin</h3>
                  {/* <ul>
                    <li>Bastrop</li>
                    <li>Dripping Springs</li>
                    <li>Georgetown</li>
                    <li>Bee Cave</li>
                  </ul> */}
                </div>
                <div className="city-list">
                  <h3>Dallas-Forth Worth</h3>
                  {/* <ul>
                    <li>Plano</li>
                    <li>Arlington</li>
                    <li>Irving</li>
                    <li>Garland</li>
                  </ul> */}
                </div>
                <div className="city-list">
                  <h3>San Antonio</h3>
                  {/* <ul>
                    <li>New Braunfels</li>
                    <li>New Braunfels</li>
                  </ul> */}
                </div>
                <div className="city-list">
                  <h3>Tucson</h3>
                </div>
                <div className="city-list">
                  <h3>Miami-Lauderdale</h3>
                </div>
                <div className="city-list">
                  <h3>Phoenix-Scottsdale</h3>
                </div>
                <div className="city-list ">
                  <h3 className="upcoming">Atlanta</h3>
                </div>
                <div className="city-list">
                  <h3 className="upcoming">Philadelphia</h3>
                </div>
                <div className="city-list">
                  <h3 className="upcoming">Chicago</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationHead;
