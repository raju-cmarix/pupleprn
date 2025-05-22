import { api } from "api/Api";
import { GET_MY_EARNING_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import {
  BenefitIcon3,
  BookTherapistIcon,
  MyEarningIcon,
} from "../../assets/svg";

export default function MYEarning({ user }) {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoader(true);
    api(GET_MY_EARNING_URL, {}, null, {
      clinicianId: user?.clinicianId?.id,
    }).then((res) => {
      if (res.status === RESPONSE_OK) setData({ ...res.data.data?.[0] });

      setLoader(false);
    });
  };
  return (
    <>
      <div className="applicant-job-list earning">
        <div className="applicant-list-main">
          {loader ? (
            <Spinner color={"primary s-center"} />
          ) : (
            <>
              <div className="applicant-box align-items-center">
                <BookTherapistIcon />
                <h2>{data.totalCompletedShifts}</h2>
                <p>Total completed shifts</p>
              </div>
              <div className="applicant-box align-items-center">
                <MyEarningIcon />
                <h2>{data.totalWorkedHours}</h2>
                <p>Total hours worked</p>
              </div>
              <div className="applicant-box align-items-center">
                <BenefitIcon3 />
                <h2>${data.totalEarnings}</h2>
                <p>Total earnings</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
