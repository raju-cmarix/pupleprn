import { api } from "api/Api";
import AddAccountFirstModal from "component/modals/jobApply/AddAccountFirst";
import JobApplyModal from "component/modals/jobApply/JobApplyModal";
import RequireNpiNumberModal from "component/modals/RequireNpiNumberModal";
import TermAndConditionsModal from "component/modals/TermsAndConditionModal";
import {
  GET_BANK_ACCOUNTS,
  GET_CLINICIAN_JOB_POST_URL,
  GET_LOGIN_DATA_URL,
} from "constants/ApiUrls";
import {
  CARD_LIMIT,
  DEFAULT_TIMEZONE,
  RESPONSE_OK,
} from "constants/AppConstants";
import { isEmpty } from "radash";
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { Spinner } from "reactstrap";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import { getLocation } from "utils/Utils";
import jobcardIcon from "../../assets/images/icons/jobboard-icon.svg";
import "./jobBoard.scss";
import JobBoardFilter from "./JobBoardFilter";
import JobCard from "./jobCard";
import NotificationSettingPopup from "component/modals/NotificationSettingPopup";
import LicenseExpiryPopup from "component/modals/LicenseExpiryPopup";
import MalPracticeLicenseExpiryPopup from "component/modals/MalPracticeLicenseExpiryPopup";
import AllClinicianBroadcastPopup from "component/modals/AllClinicianBroadcastPopup";


function JobBoard() {
  window.dataLayer.push({
    event: "pageview",
    page: {
      title: "Job Board",
      url: window.location.href,
      path: window.location.pathname,
    },
  });
  const storedDistance = JSON.parse(localStorage.getItem("distance"));
  const initFilters = {
    skip: 0,
    limit: CARD_LIMIT,
    direction: "aToZ",
    distance: storedDistance || 45,
  };
  const [open, setOpen] = useState(false);  // Modal open state
  const [licenseOpen, setLicenseOpen] = useState(false);  // Modal open state
  const [malPracticelicenseOpen, setMalPracticeLicenseOpen] = useState()
  const [clinicianBroadcastOpen, setClinicianBroadcastOpen] = useState()

  const [loader, setLoader] = useState(false);
  const [loaderButton, setLoaderButton] = useState(false);
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({ ...initFilters });
  const [applyModal, setApplyModal] = useState(false);
  const [applyModalData, setApplyModalData] = useState(null);
  const { user } = useContext(UserContext);
  const { isUserAuthenticated } = useContext(AuthContext);
  const [addAccountFirst, setAddAccountFirst] = useState(false);
  const [data, setData] = useState("");
  const [acceptTermsData, SetAcceptTermsData] = useState(data?.isTermAccept);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [requireNpiNumberModal, setRequireNpiNumberModal] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const scrollPositionRef = useRef(0);
  const navigate = useNavigate();
  const toggle = () => setOpen((prev) => !prev); // Toggle modal visibility
  const licenseToggle = () => setLicenseOpen((prev) => !prev); // Toggle license modal visibility
  const malPracticeLicenseToggle = () => setMalPracticeLicenseOpen((prev) => !prev);
  const clinicianBroadcastToggle = () => setClinicianBroadcastOpen((prev) => !prev);
  useEffect(() => {
    getList();
  }, [filters, acceptTerms, page]);

  const getList = (afterApply = false) => {
    setApplyModal(false);
    const skipData = (page - 1) * filters.limit;
    const loaderStatus = skipData <= 0;
    setLoader(loaderStatus);
    let filterData = {
      ...filters,
      skip: (page - 1) * filters.limit,
      facility: filters?.facility?.toUpperCase()?.trim(),
      clinicianId: user?.clinicianId?.id,
    };
    filterData = {
      ...filterData,
      startDate: filterData.endDate
        ? filterData.startDate?.getTime()
        : undefined,
      endDate: filterData.endDate ? filterData.endDate?.getTime() : undefined,
    };

    // reset the job listing after clinician has applied with new limits and filters
    if (afterApply) {
      filterData.limit = filterData.skip + filterData.limit;
      filterData.skip = 0;
    }

    scrollPositionRef.current = window.scrollY;
    api(GET_CLINICIAN_JOB_POST_URL, {}, null, {
      ...filterData,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        const newJobs = res.data.data;

        if (res.data.isPopupVisible.isShowNotificationPopup) {
          setOpen(true);  
        }

        if (res.data.isPopupVisible.isShowLicensePopup) {
         
          setLicenseOpen(true);  
        }

        if (res.data.isPopupVisible.isShowMalPracticeLicensePopup) {
         
          setMalPracticeLicenseOpen(true);
        }

        if (res.data.isPopupVisible.notifyPreferences.isNotify) {
          setClinicianBroadcastOpen(true); 
        }

        if (page === 1) {
          setList(newJobs);
          switch (filters?.sortBy) {
            case "hourlyRate":
              let hourlyRateArray = [...res?.data?.data];
              if (filters?.direction === "zToA") {
                hourlyRateArray = hourlyRateArray?.sort(
                  (a, b) => Number(b?.hourlyRate) - Number(a?.hourlyRate),
                );
              } else {
                hourlyRateArray = hourlyRateArray?.sort(
                  (a, b) => Number(a?.hourlyRate) - Number(b?.hourlyRate),
                );
              }
              setList([...hourlyRateArray]);

              break;
            case "clinicianType":
              let clinicianTypeArray = [...res?.data?.data];
              if (filters?.direction === "zToA") {
                clinicianTypeArray = clinicianTypeArray?.sort((a, b) =>
                  b?.clinicianType?.localeCompare(a?.clinicianType),
                );
              } else {
                clinicianTypeArray = clinicianTypeArray?.sort((a, b) =>
                  a?.clinicianType?.localeCompare(b?.clinicianType),
                );
              }
              setList([...clinicianTypeArray]);
              break;
            case "distance":
              let distanceArray = [...res?.data?.data];
              if (filters?.direction === "zToA") {
                distanceArray = distanceArray?.sort(
                  (a, b) => Number(b?.distance) - Number(a?.distance),
                );
              } else {
                distanceArray = distanceArray?.sort(
                  (a, b) => Number(a?.distance) - Number(b?.distance),
                );
              }
              setList([...distanceArray]);
              break;

            default:
              setList([...res.data.data]);
              break;
          }
        } else if (afterApply) {
          // if function triggers after job application then set the whole list otherwise append it
          setList(newJobs); //
        } else {
          setList((prevList) => [...prevList, ...newJobs]);
        }
        // Determine if there are more items to fetch
        setHasMore(newJobs.length === filters.limit);

        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current);
        }, 100);
      } else {
        setList([]);
        setHasMore(false);
      }
      setLoader(false);
    });
  };

  const getBankAccounts = async () => {
    setLoaderButton(true);
    if (user && user?.id && isUserAuthenticated) {
      try {
        const response = await api(GET_BANK_ACCOUNTS, {}, null, {
          userId: user?.id,
        });
        setLoaderButton(false);
        return response?.data?.data?.length || 0;
      } catch (error) {
        setLoaderButton(false);
        return 0;
      }
    }
  };

  const handleWaypointEnter = () => {
    if (hasMore && !loader) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getAccounts = async (data) => {
    setApplyModalData(data);
    setApplyModal(!applyModal);
  };

  const handleNPINumber = (jobCardData) => {
    const category = "User Interaction";
    const action = "Click";
    const label = "Apply";
    const value = 1;

    window.dataLayer.push({
      event: "job-apply",
      eventProps: {
        category: category,
        action: action,
        label: label,
        value: value,
      },
    });
    if (!data?.clinicianId?.npiNumber && data?.clinicianId?.roles === "pt") {
      setRequireNpiNumberModal(true);
    } else {
      setApplyModalData(jobCardData);
      setApplyModal(true);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      setLoader(true);
      api(GET_LOGIN_DATA_URL, {}).then((res) => {
        if (res.status === RESPONSE_OK) {
          SetAcceptTermsData(res?.data?.data.isTermAccept);
          setData(res.data.data);
        }
        setLoader(false);
      });
    };
    fetchData();
  }, [acceptTerms]);

  useEffect(() => {
    if (!user?.isApprovedByAdmin) {
      navigate("/");
    }
  }, [user?.id, user?.isApprovedByAdmin, isUserAuthenticated]);

  return (
    <>
      <Helmet>
        <title>Purple PRN - Job Board</title>
      </Helmet>
      <div className="job-board">
        <div className="custom-container">
          <div className="jobboard-title">
            <h1>Job Board</h1>
            <p>Search and apply to shifts at local facilities</p>
          </div>

          <JobBoardFilter
            filters={filters}
            setFilters={(fil) => {
              setPage(1); // Reset to the first page on filter change
              setFilters({ ...fil, limit: CARD_LIMIT, skip: 0 });
            }}
            getList={getList}
          />
          <div className="jobboard-cards">
            {loader || loaderButton ? (
              <Spinner />
            ) : (
              <>
                {list.length > 0 &&
                  list.map((data) => (
                    <JobCard
                      loader={loaderButton}
                      jobId={data.id}
                      handleApplyCallback={getAccounts}
                      handleNPINumber={() => handleNPINumber(data)}
                      key={data.id}
                      img={jobcardIcon}
                      mainTitle={data?.officeName}
                      facilityNickName={data?.jobAddressNickname}
                      dateTime={data.jobSlots}
                      location={getLocation(data)}
                      rating={data?.averageRating || 0}
                      review={
                        data?.averageRating
                          ? `(${data?.totalReviews || "No"} reviews)`
                          : `${data?.totalReviews || "No"} reviews`
                      }
                      pay={`Estimated pay: $${data?.totalPay}`}
                      adminHourlyRate={`Hourly Rate: `}
                      data={data}
                      timeZone={data.timeZone ?? DEFAULT_TIMEZONE}
                    />
                  ))}
                {hasMore && <Waypoint onEnter={handleWaypointEnter} />}
              </>
            )}
            {!loader && !list.length && (
              <p className="text-center no-records">No shifts found</p>
            )}
          </div>
          {/* {list.length > 0 && (
            <CustomPagination
              type={"card"}
              count={count}
              filters={filters}
              setFilters={setFilters}
              currentPage={page} // Pass the current page
              onPageChange={handlePageChange}
            />
          )} */}
        </div>
      </div>
      {!isEmpty(applyModalData) && (
        <JobApplyModal
          data={applyModalData}
          modal={applyModal}
          toggle={() => {
            setApplyModal(!applyModal);
          }}
          setPage={setPage}
          filters={initFilters}
          setFilters={setFilters}
          getList={getList}
        />
      )}
      {addAccountFirst && (
        <AddAccountFirstModal
          modal={addAccountFirst}
          toggle={() => {
            setAddAccountFirst(!addAccountFirst);
          }}
          apply={() => {
            setApplyModal(true);
            setAddAccountFirst(!addAccountFirst);
          }}
        />
      )}
      {acceptTermsData === false ? (
        <TermAndConditionsModal
          modal={true}
          data={data}
          toggle={() => setAcceptTerms(!acceptTerms)}
        />
      ) : (
        ""
      )}
      {!data?.clinicianId?.npiNumber && data?.clinicianId?.roles === "pt" && (
        <RequireNpiNumberModal
          modal={requireNpiNumberModal}
          data={data}
          toggle={() => setRequireNpiNumberModal(!requireNpiNumberModal)}
        />
      )}
       <NotificationSettingPopup modal={open} toggle={toggle} clinicianId={data?.clinicianId?.id}/>
       <LicenseExpiryPopup modal={licenseOpen} toggle={licenseToggle} clinicianId={data?.clinicianId?.id}/>
       <MalPracticeLicenseExpiryPopup modal={malPracticelicenseOpen} toggle={malPracticeLicenseToggle} clinicianId={data?.clinicianId?.id}/>
       <AllClinicianBroadcastPopup modal={clinicianBroadcastOpen} toggle={clinicianBroadcastToggle} clinicianId={data?.clinicianId?.id} notifyPreferences={data && data?.notifyPreferences}/>
    </>
  );
}
export default JobBoard;
