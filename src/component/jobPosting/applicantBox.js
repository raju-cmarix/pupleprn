import React, { useContext, useState } from "react";
import {
  CheckIcon,
  CrossIcon,
  MsgIcon,
  StarRatingIcon,
} from "../../assets/svg";
import { UncontrolledTooltip } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import DatesLabel from "component/common/DatesLabel";
import { api } from "api/Api";
import {
  APPROVE_REJECT_APPLICANT_URL,
  GET_ACH_PAYMENT_URL,
  PRIMARY_CARD,
} from "constants/ApiUrls";
import {
  AcceptClinicianApplicationTexts,
  applicantNewTimes,
  CANCEL,
  LOCALSTORAGE_CONFIRMSHIFT,
  NO_RATINGS,
  NO_REVIEWS,
  PaymentMethods,
  RESPONSE_OK,
  SmallLogoURL,
} from "constants/AppConstants";
import "./jobPosting.scss";
import AcceptClinicianModalWPayment from "./Modals/AcceptClinicianApplication";
import RejectClinicianModal from "./Modals/RejectClinicianApplication";
import UserContext from "utils/context/UserContext";
import AcceptClinicianApplicationInitial from "./Modals/AcceptClinicianApplicationInitial";
import AcceptClinicianApplicationWInvoice from "./Modals/AcceptClinicianApplicationWInvoice";
import { toast } from "react-toastify";
import ACHPaymentLinkPopup from "component/modals/ACHPaymentLinkPopup";

const ApplicantCard = ({
  data,
  queryStringObj,
  getList,
  qs,
  linkTo,
  cardsCount,
  cards,
  trigger,
  jobId,
  defaultCard,
  chatId,
  jobSlots,
  accounts,
  defaultAccount,
  timeZone,
}) => {
  const [loader, setLoader] = useState(false);
  const [accept, setAccept] = useState(0);
  const [reject, setReject] = useState(false);
  const [trig, setTrig] = useState(false);
  const [achPaymentLink, setAchPaymentLink] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleApplication = async (status, price) => {
    if (status === "accepted") {
      setLoader(true);
      let reqObj = {
        ...queryStringObj,
        id: data.id,
        status: status,
        role: "facility",
        ...price,
        timeZone: timeZone,
      };
      const sendPayment = () => {
        api(APPROVE_REJECT_APPLICANT_URL, reqObj).then((res) => {
          if (res.status === RESPONSE_OK) {
            setLoader(false);
            setAccept(0);
            getList();
          }
        });
      };
      if (price?.paymentMethod === PaymentMethods?.ACH) {
        const userId = user?.id;
        try {
          const response = await api(GET_ACH_PAYMENT_URL, {
            userId,
            grandTotal: price?.grandTotal,
            jobApplicantId: data?.id,
            // when you use in localhost uncomment this one unless it is ok
            // platform: "local",
          });
          setAchPaymentLink(response?.data?.data);
          localStorage?.setItem(
            LOCALSTORAGE_CONFIRMSHIFT,
            JSON.stringify(reqObj),
          );
          setAccept(0);
        } catch (error) {
          toast?.error(AcceptClinicianApplicationTexts.SOMETHING);
        }
      }
      if (price?.paymentMethod === PaymentMethods?.Card) {
        if (cardsCount) {
          const userId = user?.id;

          const defaultCardDetails = (card) => {
            return {
              id: card?.id,
              userId,
              isPrimary: card?.isPrimary || true,
            };
          };

          if (price?.defaultCard?.id !== defaultCard?.id) {
            api(PRIMARY_CARD, defaultCardDetails(price?.defaultCard)).then(
              (res) => {
                trigger();
                if (res?.data?.status === RESPONSE_OK) {
                  sendPayment();
                } else {
                  setLoader(false);
                }
              },
            );
          } else {
            sendPayment();
          }
        } else {
          navigate(`/facility/settings${qs}&payments=1`);
        }
      }
      if (price?.paymentMethod === PaymentMethods?.Invoice) {
        sendPayment();
      }
    }
    if (status === "rejected") {
      let reqObj = {
        ...queryStringObj,
        id: data.id,
        status: status,
        role: "facility",
      };
      setLoader(true);
      api(APPROVE_REJECT_APPLICANT_URL, reqObj).then((res) => {
        if (res.status === RESPONSE_OK) {
          setReject(!reject);
          getList();
        }
        setLoader(false);
      });
    }
  };
  return (
    <>
      <div className="applicant-box">
        <div className="applicant-name-img">
          <img
            src={data?.profileUrl || SmallLogoURL}
            alt={"Profile Pic"}
          />
          <span>
            {data?.clinicianId?.firstName || data?.firstName}{" "}
            {data?.clinicianId?.lastName || data?.lastName}{" "}
            {data?.clinicianType || data?.clinicianId?.roles
              ? `(${
                  data?.clinicianType
                    ? data?.clinicianType?.toUpperCase()
                    : data?.clinicianId?.roles?.toUpperCase()
                })`
              : ""}
          </span>
        </div>
        <div className="applicant-time">
          <span>
            Date & Time {data?.isProposedNewTime ? "(original)" : ""} :
          </span>
          <DatesLabel
            className={"mb-0"}
            arr={jobSlots}
            timeZone={data.timeZone}
          />
        </div>
        {data?.isProposedNewTime && (
          <>
            <div className="applicant-time">
              <span>
                Date & Time ({data?.isProposedNewTime ? "proposed" : ""}) :
              </span>
              <DatesLabel
                className={"mb-0"}
                arr={data?.applicantSlots}
                timeZone={data.timeZone}
              />
            </div>
            <div className="applicant-status">{applicantNewTimes}</div>
          </>
        )}
        <div className="applicant-btn">
          {user?.roles === "facility" ? (
            <Link
              to={
                linkTo
                  ? linkTo
                  : `/facility/clinicianprofile/${
                      data.clinicianId?.id || data.clinicianId
                    }${qs}`
              }
              className="pt-btn btn-primary pt-btn-small">
              View details
            </Link>
          ) : (
            <Link
              to={
                linkTo
                  ? linkTo
                  : `/facility/clinicianprofile/${
                      data.clinicianId?.id || data.clinicianId
                    }${qs}`
              }
              className="pt-btn btn-primary pt-btn-small mx-auto ">
              View details
            </Link>
          )}
          <div className="icon-group">
            {/* {data.status === "accepted" && user?.roles === "facility" ? ( */}
            {user?.roles === "facility" && (
              <>
                <Link
                  to="/chat-profile"
                  id={"chat" + data.id}
                  state={{
                    receiverId: chatId,
                  }}
                  className="pt-btn-icon btn-info">
                  <MsgIcon />
                </Link>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"chat" + data.id}>
                  Chat
                </UncontrolledTooltip>
              </>
            )}
            {/* ) : (
              <></>
            )} */}
            {data.status === "accepted" || data.status === "rejected" ? (
              <h3
                className={
                  data.status === "accepted" ? "text-secondary" : "text-danger"
                }>
                {data.status === "accepted" ? "Approved" : "Declined"}
              </h3>
            ) : (
              <></>
            )}
            {data.status === "pending" && user?.roles === "facility" ? (
              <>
                <button
                  id={"approve" + data.id}
                  className="pt-btn-icon btn-secondary"
                  onClick={() => {
                    trigger();
                    setAccept(3);
                  }}>
                  <CheckIcon />
                </button>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"approve" + data.id}
                  id="ApplicantsTickIcon"
                  trigger="hover">
                  Approve
                </UncontrolledTooltip>
                <button
                  id={"reject" + data.id}
                  className="pt-btn-icon btn-danger"
                  onClick={() => {
                    trigger();
                    setReject(!reject);
                  }}>
                  <CrossIcon />
                </button>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"reject" + data.id}>
                  Reject
                </UncontrolledTooltip>
              </>
            ) : (
              <></>
            )}
          </div>
          {data?.status === CANCEL && (
            <h3
              className={`text-${
                data?.status === CANCEL ? "danger" : "primary"
              } mb-0`}>
              {data?.status === CANCEL ? "Cancelled" : ""}
            </h3>
          )}
        </div>
      </div>
      <AcceptClinicianApplicationInitial
        isOpen={accept === 1}
        toggle={() => setAccept(0)}
        args={{}}
        accept={accept}
        cardsCount={cardsCount}
        setAccept={(e) => {
          setAccept(e);
          setLoader(false);
        }}
        trigger={trig}
        navigateToPaymentTab={() =>
          navigate(`/facility/settings${qs}&payments=1`)
        }
      />
      <AcceptClinicianApplicationWInvoice
        isOpen={accept === 3}
        toggle={() => {
          setAccept(0);
          setTrig(!trig);
        }}
        args={{}}
        accept={accept}
        setAccept={(e) => {
          setAccept(e);
          setLoader(false);
        }}
        handleApplication={(paymentCharges) =>
          handleApplication("accepted", paymentCharges)
        }
        loader={loader}
      />
      <AcceptClinicianModalWPayment
        jobId={jobId}
        isOpen={accept === 2 || accept === 4}
        toggle={() => {
          setAccept(0);
          trigger();
          setTrig(!trig);
        }}
        bankTransfer={accept === 4}
        handleApplication={(paymentCharges) =>
          handleApplication("accepted", paymentCharges)
        }
        trigger={trigger}
        totalAmount={data?.totalAmount}
        totalWorkedHours={data?.totalWorkedHours}
        loading={loader}
        setLoading={setLoader}
        hourlyRate={data?.hourlyRate}
        setAccept={(e) => {
          setAccept(e);
          setLoader(false);
        }}
        // Cards
        cards={cards}
        defaultCard={defaultCard}
        // Accounts
        accounts={accounts}
        defaultAccount={defaultAccount}
        achPaymentLink={achPaymentLink}
      />
      <RejectClinicianModal
        isOpen={reject}
        toggle={() => setReject(!reject)}
        handleApplication={() => handleApplication("rejected")}
      />
      <ACHPaymentLinkPopup
        isOpen={achPaymentLink}
        toggle={(a) =>
          achPaymentLink ? setAchPaymentLink(null) : setAchPaymentLink(a)
        }
      />
    </>
  );
};

export default ApplicantCard;
