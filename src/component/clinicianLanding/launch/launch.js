import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MainImage } from "../../../assets/images/icons/main-vector.svg";
import { LaunchIcon } from "../../../assets/svg";
import "./launch.scss";

function Launch() {
  return (
    <>
      <div className="launch-main">
        <div className="launch-content">
          <LaunchIcon />
          <p>
            We’re in the following cities:
            <br />
            Houston, The Woodlands, Katy, Galveston, Austin, San Antonio,
            Dallas-Fort Worth, Miami-Ft. Lauderdale, Phoenix and Tucson
          </p>
          <p>
            We’re excited to launch in:
            <br />
            Chicago, Philadelphia, and Atlanta
          </p>
          {/* <p className="mb-0">Coming soon in 2024 <br/>
            Austin, Dallas, and San Antonio</p> */}
          <Link
            to="/findus"
            className="pt-btn btn-primary">
            Lets Go!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Launch;
