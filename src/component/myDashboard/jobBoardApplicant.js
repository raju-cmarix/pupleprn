import { api } from "api/Api";
import { GET_CLINICIAN_JOB_LIST } from "constants/ApiUrls";
import { CARD_LIMIT, DEFAULT_TIMEZONE } from "constants/AppConstants";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import UserContext from "utils/context/UserContext";
import { getLocation } from "utils/Utils";
import CustomPagination from "../common/customPagination";
import JobCard from "./jobCard";
import Select from "react-dropdown-select";
import { jobBoardApplicationStatus } from "views/authentication/signUpClinician/HourlyConstant";

function JobBoardApplicant() {
  const [filters, setFilters] = useState({ skip: 0, limit: CARD_LIMIT, status:'pending' });
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const getData = () => {
    setLoader(true);
    api(GET_CLINICIAN_JOB_LIST, {}, null, {
      ...filters,
      clinicianId: user?.clinicianId?.id,
    }).then((res) => {
      setData(res?.data);
      setLoader(false);
    });
  };

  useEffect(getData, [filters]);

  return (
    <>
      <div className="applicant-job-list job-board">
        <div className="header">
          <div className="user-sorting usertype">
            <label htmlFor="type">Status</label>
            <div className="sort">
              <Select
                placeholder={jobBoardApplicationStatus[2]?.label}
                onChange={(val) => {
                  setFilters({
                    ...filters,
                    skip: 0,
                    limit: CARD_LIMIT,
                    status: val && val?.length ? val[0].value : null,
                  });
                }}
                options={jobBoardApplicationStatus}
                id="type"
              />
            </div>
          </div>
        </div>
        <div className="applicant-list-main">
          {loader && <Spinner color={"primary s-center"} />}
          {!loader && data?.data?.map((jobCard, key) => {
            return (
              <JobCard
                jobBoard
                jobId={jobCard?.jobId?.id || jobCard?.id}
                key={key}
                img={jobCard?.facilityId?.ProfilePicUrl}
                maintitle={jobCard?.facilityId?.officeName}
                timeZone={jobCard.timeZone ?? DEFAULT_TIMEZONE}
                // datetime={jobCard?.jobSlots}
                datetime={jobCard?.applicantSlots}
                location={getLocation(jobCard?.jobId || jobCard)}
                rating={
                  jobCard?.averageRating
                    ? `${jobCard?.averageRating ? jobCard?.averageRating : 0}/5`
                    : ""
                }
                review={
                  jobCard?.averageRating
                    ? `(${
                        jobCard?.totalReviews ? jobCard?.totalReviews : "No"
                      } reviews)`
                    : `${
                        jobCard?.totalReviews ? jobCard?.totalReviews : "No"
                      } reviews`
                }
                pay={`Estimated pay: $${
                  jobCard?.totalAmount
                    ? jobCard?.totalAmount
                    : jobCard?.totalPay
                }`}
                perhour={`${
                  jobCard?.jobId?.hourlyRate || jobCard?.hourlyRate
                } `}
                JobBoadReject="Job01"
                JobBoad="Job1"
                data={jobCard}
                clinicianId={user?.clinicianId?.id}
                refresh={getData}
              />
            );
          })}

          {!data.data ||
            !data.data ||
            (!data.data.length && !loader && (
              <p className="no-datadisplay">There are no records to display</p>
            ))}
        </div>
        <CustomPagination
          type={"card"}
          count={data?.count || 0}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </>
  );
}

export default JobBoardApplicant;
