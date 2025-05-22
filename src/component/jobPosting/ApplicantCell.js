import { CheckIcon, CrossIcon, MsgIcon } from "assets/svg";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import UserContext from "utils/context/UserContext";
import AcceptClinicianApplicationWInvoice from "./Modals/AcceptClinicianApplicationWInvoice";
import { timeZone } from "utils/Utils";
import { APPROVE_REJECT_APPLICANT_URL } from "constants/ApiUrls";
import { PaymentMethods, RESPONSE_OK } from "constants/AppConstants";
import { api } from "api/Api";
import RejectClinicianApplication from "./Modals/RejectClinicianApplication";

function ApplicantCell({ row, getList }) {
  const { user } = useContext(UserContext);
  const [accept, setAccept] = useState(0);
  const [loader, setLoader] = useState(false);
  const [reject, setReject] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleApplication = async (status, price) => {
    if (status === "accepted") {
      setLoader(true);
      let reqObj = {
        facilityId: row?.facilityId,
        jobId: row?.id,
        id: selectedData?.id,
        status: status,
        role: "facility",
        ...price,
        timeZone: timeZone(),
      };
      const sendPayment = () => {
        api(APPROVE_REJECT_APPLICANT_URL, reqObj).then((res) => {
          if (res.status === RESPONSE_OK) {
            setLoader(false);
            setAccept(0);
            getList();
            setSelectedData(null);
          }
        });
      };
      if (price?.paymentMethod === PaymentMethods?.Invoice) {
        sendPayment();
      }
    }
    if (status === "rejected") {
      let reqObj = {
        facilityId: row?.facilityId,
        jobId: row?.id,
        id: selectedData?.id,
        status: status,
        role: "facility",
      };
      setLoader(true);
      api(APPROVE_REJECT_APPLICANT_URL, reqObj).then((res) => {
        if (res.status === RESPONSE_OK) {
          setReject(!reject);
          setSelectedData(null);
          getList();
        }
        setLoader(false);
      });
    }
  };
  return (
    <div className="min-100 w-100">
      {row.applicants.length > 0 ? (
        <>
          {row?.applicants?.map((app) => (
            <div
              key={app?.id}
              className="d-flex justify-content-between my-2 gap-1">
              <div className="w-50">
                <Link
                  to={`/facility/clinicianprofile/${app?.clinicianId}?jobId=${row.id}&facilityId=${row.facilityId}`}
                  target="_blank">
                  {app?.clinicianFirstName} {app?.clinicianLastName?.charAt(0)}.
                </Link>
              </div>
              <div className="w-50 d-flex justify-content-start icon-group-job-list">
                <Link
                  to={`/chat-profile?open=${app?.userId}`}
                  target="_blank"
                  id={"chat" + app.id}
                  state={{
                    receiverId: app?.userId,
                  }}
                  className="pt-btn-icon btn-info">
                  <MsgIcon />
                </Link>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"chat" + app.id}>
                  Chat
                </UncontrolledTooltip>
                {(app.status === "accepted" || app.status === "rejected") && (
                  <h3
                    className={`mb-0 ${
                      app.status === "accepted"
                        ? "text-secondary"
                        : "text-danger"
                    }`}>
                    {app.status === "accepted" ? "Approved" : "Declined"}
                  </h3>
                )}
                {app.status === "pending" &&
                  user?.roles === "facility" &&
                  row?.status !== "expired" && (
                    <>
                      <button
                        id={"approve" + app.id}
                        className="pt-btn-icon btn-secondary"
                        onClick={() => {
                          setAccept(3);
                          setSelectedData(app);
                        }}>
                        <CheckIcon />
                      </button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"approve" + app.id}
                        id="ApplicantsTickIcon"
                        trigger="hover">
                        Approve
                      </UncontrolledTooltip>
                      <button
                        id={"reject" + app.id}
                        className="pt-btn-icon btn-danger"
                        onClick={() => {
                          setReject(!reject);
                          setSelectedData(app);
                        }}>
                        <CrossIcon />
                      </button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"reject" + app.id}>
                        Reject
                      </UncontrolledTooltip>
                    </>
                  )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>-</>
      )}
      <AcceptClinicianApplicationWInvoice
        isOpen={accept === 3}
        toggle={() => {
          setAccept(0);
          //   setTrig(!trig);
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
      <RejectClinicianApplication
        isOpen={reject}
        toggle={() => setReject(!reject)}
        handleApplication={() => handleApplication("rejected")}
      />
    </div>
  );
}

export default ApplicantCell;
