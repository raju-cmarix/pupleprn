import React from "react";
import NoData from "../../assets/images/no-data.png";

function NoDataFound() {
  
    return (
      <>
      <div className="nodata">
        <img src={NoData} className="img-fluid" />
      <p>No Data Found!</p>
      </div>
      </>
    );
  }
  
  export default NoDataFound;