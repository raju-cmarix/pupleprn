import { api } from 'api/Api';
import { CheckIcon, CrossIcon } from 'assets/svg'
import AcceptClinicianByAdmin from 'component/jobPosting/Modals/AcceptClinicianByAdmin';
import RejectClinicianApplication from 'component/jobPosting/Modals/RejectClinicianApplication';
import { APPROVE_REJECT_APPLICANT_URL } from 'constants/ApiUrls';
import { PaymentMethods, RESPONSE_OK } from 'constants/AppConstants';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'
import { timeZone } from 'utils/Utils';
import UserContext from 'utils/context/UserContext';

function AdminApplicantCell({row, getList}) {
    const { user } = useContext(UserContext);
    const [accept, setAccept] = useState(0);
    const [loader, setLoader] = useState(false);
    const [reject, setReject] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleApplication = async (status, price) => {
      if (status === "accepted") {
        setLoader(true);
        let reqObj = {
          facilityId:row?.facilityId,
          jobId:row?.id,
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
              setSelectedData(null)
            }
          });
        };
        if (price?.paymentMethod === PaymentMethods?.Invoice) {
          sendPayment();
        }
      }
      if (status === "rejected") {
        let reqObj = {
          facilityId:row?.facilityId,
          jobId:row?.id,
          id: selectedData?.id,
          status: status,
          role: "facility",
        };
        setLoader(true);
        api(APPROVE_REJECT_APPLICANT_URL, reqObj).then((res) => {
          if (res.status === RESPONSE_OK) {
            setReject(!reject);
            setSelectedData(null)
            getList();
          }
          setLoader(false);
        });
      }
    };

  return (
    <div className="text-secondary min-100 w-100">
    {row.applicants.length > 0 ? (
      <>
        {row?.applicants?.map((app) => (
          <div key={app?.id} className="d-flex my-2 justify-content-between" style={{ gap: '1px' }}>
            <Link to={`/admin/facility/clinicianprofile/${app?.clinicianId}?jobId=${row.id}&facilityId=${row.facilityId}`} target='_blank'>
              {app?.clinicianFirstName} {app?.clinicianLastName?.charAt(0)}.
            </Link>
            <div className="icon-group-job-list">
            </div>
            <div className="icon-group-job-list">
              <>
                {(app.status === "accepted" || app.status === "rejected") && (
                  <h3
                    className={` mb-0
                      ${app.status === "accepted" ? "text-secondary" : "text-danger"}
                    `}
                  >
                    {app.status === "accepted" ? "Approved" : "Declined"}
                  </h3>
                )}
                {app.status === "pending" && user?.roles === "admin" && row?.status !== 'expired' && (
                  <>
                    < button
                      id={"approve" + app.id}
                      className="pt-btn-icon btn-secondary"
                    onClick={() => {
                      setAccept(3);
                      setSelectedData(app)
                    }}
                    >
                      <CheckIcon />
                    </button>
                    <UncontrolledTooltip
                      placement="bottom"
                      target={"approve" + app.id}
                      id="ApplicantsTickIcon"
                      trigger="hover"
                    >
                      Approve
                    </UncontrolledTooltip>
                    <button
                      id={"reject" + app.id}
                      className="pt-btn-icon btn-danger"
                    onClick={() => {
                      setReject(!reject);
                      setSelectedData(app)
                    }}
                    >
                      <CrossIcon />
                    </button>
                    <UncontrolledTooltip
                      placement="bottom"
                      target={"reject" + app.id}
                    >
                      Reject
                    </UncontrolledTooltip>
                  </>
                )}
              </>

            </div>
          </div>
        )
        
        )}
      </>
    ) : (
      <>-</>
    )}
    <AcceptClinicianByAdmin
        isOpen={accept === 3}
        toggle={() => {
          setAccept(0);
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
    {/* <AcceptClinicianApplicationWInvoice
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
      /> */}
        <RejectClinicianApplication
        isOpen={reject}
        toggle={() => setReject(!reject)}
        handleApplication={() => handleApplication("rejected")}
      />
  </div >
  )
}

export default AdminApplicantCell