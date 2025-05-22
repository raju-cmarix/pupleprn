import { Col, Row } from "reactstrap";
import "./landingMain.scss";
import ConditionalLinks from "component/common/ConditionalLinks";
import VideoPlayer from "../video/VideoPlayer";

function LandingMainhead() {
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: 'Home',
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  return (
    <>
      <div className="landing-main-head">
        <div className="custom-container">
          <Row className="align-items-center landing-main" >
            <Col lg={6}>
              <VideoPlayer/>
            </Col>
            <Col lg={6}>
              <div className="landing-main-content">
                <h1>
                  Hire Staff or Apply to Work<span>Quickly and Simply</span>
                </h1>

                <p>
                  Purple PRN connects allied health professionals (PT, PTA, OT,
                  OTA, SLP) with local healthcare facilities for flexible shifts
                </p>
                <div className="landing-btns">
                  <ConditionalLinks type={"link"} role="fac" />

                  <ConditionalLinks type={"link"} role="cli" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default LandingMainhead;
