import React, { useContext, useEffect, useState } from "react";
import { BackIcon } from "../../assets/svg";
import ApplicantCard from "./applicantBox";
import CustomPagination from "../common/customPagination";
import { Link, useLocation } from "react-router-dom";
import { api } from "api/Api";
import {
  GET_ACCOUNTS,
  GET_APPLICANTS_LIST_URL,
  GET_CARDS,
} from "constants/ApiUrls";
import { CARD_LIMIT, NoApplicants, RESPONSE_OK } from "constants/AppConstants";
import queryString from "query-string";
import { Spinner } from "reactstrap";
import DatesToolTip from "component/common/DatesTooltip";
import "./jobPosting.scss";
import UserContext from "utils/context/UserContext";

function JobApplicantListing() {
  const initFilters = {
    skip: 0,
    limit: CARD_LIMIT,
  };
  const location = useLocation();
  const [list, setList] = useState([]);

  const [jobSlots, setJobSlots] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const [queryStringObj, setQueryStringObj] = useState({});
  const [qs, setQs] = useState("");

  const [cardsCount, setCardsCount] = useState(0);
  const [defaultCard, setDefaultCard] = useState({});
  const [cards, setCards] = useState({});
  const [accounts, setAccounts] = useState({});
  const [accountsCount, setAccountsCount] = useState(0);
  const [defaultAccount, setDefaultAccount] = useState({});
  const [swi, setSwitch] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let qsObj = queryString.parse(location.search);
    setQs(location.search);
    setQueryStringObj({ ...qsObj });
    getList(qsObj);
  }, [filters, location]);

  const getList = (qs) => {
    setLoader(true);

    api(GET_APPLICANTS_LIST_URL, {}, null, { ...qs, ...filters }).then(
      (res) => {
        if (res.status === RESPONSE_OK) {
          setList(res.data.data);
          setCount(res.data.count);
          setJobSlots(res.data.jobSlots);
        }
        setLoader(false);
      },
    );
  };

  // useEffect(() => {
  // api(GET_CARDS, {}, null, { userId: user?.id }).then((res) => {
  //   const cards = res?.data?.data;
  //   let primary = {};

  //   cards?.forEach((card) => {
  //     if (card?.isPrimary) {
  //       primary = { ...card };
  //     }
  //   });

  //   setDefaultCard(primary);
  //   setCardsCount(res?.data?.count);
  //   setCards(res?.data?.data);
  // });

  // api(GET_ACCOUNTS, {}, null, { userId: user?.id }).then((res) => {
  //   const accounts = res?.data?.data;
  //   let primary = {};

  //   accounts?.forEach((account) => {
  //     if (account?.isPrimary) {
  //       primary = { ...account };
  //     }
  //   });

  //   setDefaultAccount(primary);
  //   setAccountsCount(res?.data?.count);
  //   setAccounts(res?.data?.data);
  // });
  // }, [user, swi]);

  return (
    <>
      <div className="applicant-job-list position-static">
        <div className="custom-container position-static">
          <div className="back-btn">
            <Link to="/facility/shiftmanagement">
              <BackIcon /> Back to My Shifts
            </Link>
          </div>

          {list.length > 0 && (
            <>
              <h3
                className="text-capitalize"
                id={"heading"}>
                Applicants for shift
                {list[0]?.officeName && `: ${list[0]?.officeName}`}
              </h3>
              <DatesToolTip
                id={"heading"}
                arr={jobSlots}
                placement={"top"}
              />
            </>
          )}
          {loader && (
            <div className="d-flex align-items-center justify-content-center py-5">
              <Spinner />
            </div>
          )}
          <div className="applicant-list-main">
            {list.length > 0 ? (
              list.map((data, index) => {
                return (
                  <ApplicantCard
                    jobId={
                      list[0]?.jobId?.serialNumber || list[0]?.serialNumber
                    }
                    chatId={data.clinicianId?.userId || data?.userId}
                    qs={qs}
                    getList={() => getList(queryStringObj)}
                    key={index}
                    data={data}
                    queryStringObj={queryStringObj}
                    trigger={() => setSwitch(!swi)}
                    jobSlots={jobSlots}
                    // Accounts
                    accounts={accounts}
                    accountsCount={accountsCount}
                    defaultAccount={defaultAccount}
                    // Cards
                    cards={cards}
                    cardsCount={cardsCount}
                    defaultCard={defaultCard}
                    timeZone={jobSlots[0]?.timeZone}
                  />
                );
              })
            ) : (
              <>
                <p id="noApplicants">{NoApplicants}</p>
              </>
            )}
          </div>
          <CustomPagination
            count={count}
            filters={filters}
            setFilters={setFilters}
            type={"card"}
          />
        </div>
      </div>
    </>
  );
}

export default JobApplicantListing;
