import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomPagination from "../../../component/common/customPagination";
import {
  APP_LIMIT,
  MINUTE_MS,
  TRANSACTIONS,
} from "../../../constants/AppConstants";
import {
  GET_BANK_ACCOUNTS,
  GET_CLINICIAN_TRANSACTIONS,
} from "constants/ApiUrls";
import { api } from "api/Api";
import UserContext from "utils/context/UserContext";
import BankAccountConnect from "component/modals/BankAccountConnect";
import FailAccountAdd from "component/modals/FailAccountAddModal";
import { getDateFormat } from "utils/Utils";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/context/AuthContext";

function PaymentInformation(props, args) {
  const initFilters = {
    skip: 0,
    limit: APP_LIMIT,
    forAdmin: 1,
    forFacility: 0,
    clinicianId: 0,
  };
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({ ...initFilters });
  const { isUserAuthenticated } = useContext(AuthContext);

  const [loader, setLoader] = useState(false);

  const [modal, setModal] = useState(false);
  const [transactions, setTransactions] = useState({});
  const [accounts, setAccounts] = useState({});
  const [failModal, setFailModal] = useState(false);
  const [accountLink, setAccountLink] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => {
    if (modal === true) {
      navigate(`/clinician/settings`);
    }
    setModal(!modal);
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => getDateFormat(row?.startDate),
      sortable: true,
    },
    {
      name: "Shift ID",
      selector: (row) => row?.serialNumber || "-",
      sortable: true,
    },
    {
      name: "Facility Name",
      selector: (row) => row?.officeName,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row?.payoutAmount ? `$${row.payoutAmount.toFixed(2)}` : "-",
      // selector: (row) => parseFloat(row?.payoutAmount.toFixed(2)) || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.paymentStatusClinician || "completed",
      sortable: true,
    },
  ];
  // const getAccountDetails = () =>
  //   api(GET_BANK_ACCOUNTS, {}, null, {
  //     userId: user?.id,
  //   }).then((res) => setAccounts(res?.data));

  useEffect(() => {
    if (
      props?.currentActiveTab &&
      Number(props?.currentActiveTab) === 3 &&
      user?.id
    ) {
      api(GET_CLINICIAN_TRANSACTIONS, {}, null, {
        userId: user?.id,
        ...filters,
      }).then((res) => {
        setTransactions(res?.data);
        setCount(res?.data?.count);
      });
      // getAccountDetails();
    }
  }, [props?.currentActiveTab, filters, user?.id]);

  useEffect(() => {
    if (
      props?.qsObj?.accountaddfailure &&
      Number(props?.qsObj?.accountaddfailure) === 1
    ) {
      setFailModal(true);
    }
    if (props?.qsObj?.addaccount && Number(props?.qsObj?.addaccount) === 1) {
      toggleModal();
    }
  }, [props?.qsObj]);

  // useEffect(() => {
  //   if (isUserAuthenticated) {
  //     const interval = setInterval(() => getAccountDetails(), MINUTE_MS);

  //     return () => clearInterval(interval);
  //   }
  // }, [isUserAuthenticated, user?.id]);

  return (
    <>
      <div className="general-content login-content">
        {/* <h5 className="mb-12">{DIRECT_DEPOSIT?.label}</h5>
        <p>{DIRECT_DEPOSIT?.text}</p>
        <div className="payment-cards">
          {accounts?.data &&
            accounts?.data?.length > 0 &&
            accounts?.data?.map?.((account) => (
              <BankAccounts account={account} />
            ))}
        </div>
        <div className="payment-block mt-2">
          <button className="btn-link" onClick={toggleModal}>
            {accounts?.data && accounts?.data?.length > 0
              ? "Change "
              : "+ Add "}
            Bank Account Info
          </button>
        </div>
        <div className="dashed-border"></div> */}
        <h5 className="mb-12">{TRANSACTIONS?.label}</h5>
        {/* Subtitle */}
        {!count ? (
          <p>{TRANSACTIONS?.text}</p>
        ) : (
          <div className="facility-payment-detail">
            <DataTable
              columns={columns}
              data={transactions?.data || []}
            />
            <CustomPagination
              count={count}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        )}
      </div>
      <BankAccountConnect
        isOpen={modal}
        toggle={toggleModal}
        getLink={setAccountLink}
        link={accountLink}
        loader={loader}
        setLoader={setLoader}
      />
      <FailAccountAdd
        isOpen={failModal}
        toggle={() => setFailModal(!failModal)}
        getLink={setAccountLink}
        link={accountLink}
        loader={loader}
        setLoader={setLoader}
      />
    </>
  );
}

export default PaymentInformation;
