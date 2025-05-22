import { api } from "api/Api";
import CardBox from "component/paymentInformationDetails/CardBox";
import { GET_ACCOUNTS, GET_CARDS, GET_TRANSACTIONS } from "constants/ApiUrls";
import { APP_LIMIT, TRANSACTIONS } from "constants/AppConstants";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
} from "reactstrap";
import UserContext from "utils/context/UserContext";
import { getDateFormat } from "utils/Utils";
import CustomPagination from "../../common/customPagination";
import BankInformation from "./bankInformation";
import CardInformation from "./cardInformation";
import AddCard from "./Modals/PaymentInformationModal";
import AddCardBank from "./Modals/BankPaymentInformationModal";
import Bank from "../../../assets/images/icons/bank.png";
import { DotIcon } from "assets/svg";
const initFilters = {
  skip: 0,
  limit: APP_LIMIT,
};
function PaymentInformation(props, args) {
  const [cardData, setCardData] = useState({});
  const [accountsData, setAccountsData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({ ...initFilters });
  const [transactions, setTransactions] = useState({});

  const columns = [
    {
      name: "Date",
      selector: (row) => {
        return getDateFormat(row?.createdAt);
      },
      sortable: true,
    },
    {
      name: "Shift ID",
      selector: (row, index) => (
        <>
          <p id={"id-" + index}>{row.serialNumber || "-"}</p>
          <UncontrolledTooltip
            className="mw-200"
            placement={"bottom"}
            target={"id-" + index}>
            {row.serialNumber || "-"}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Clinician Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Amount ($)",
      selector: (row) => row.amount ? `$${row.amount}` : "-",
      // selector: (row) => row.amount || "-",
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod || "card",
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (props?.currentActiveTab && Number(props?.currentActiveTab) === 3) {
  //     api(GET_CARDS, {}, null, { userId: user?.id }).then((res) =>
  //       setCardData(res?.data),
  //     );
  //     // api(GET_ACCOUNTS, {}, null, { userId: user?.id }).then((res) =>
  //     //   setAccountsData(res?.data)
  //     // );
  //   }
  // }, [
  //   props?.addCardModal,
  //   refresh,
  //   props?.currentActiveTab,
  //   props?.addBankModal,
  // ]);

  // toggleCardModal
  // addCardModal

  useEffect(() => {
    if (
      props?.currentActiveTab &&
      Number(props?.currentActiveTab) === 3 &&
      user?.id
    ) {
      api(GET_TRANSACTIONS, {}, null, { userId: user?.id, ...filters }).then(
        (res) => setTransactions(res?.data),
      );
    }
  }, [props?.currentActiveTab, filters, user?.id]);
  return (
    <>
      <div className="general-content login-content">
        <h5 className="mb-12">Payment method</h5>
        <p>
          Add and manage your payment methods using our secure payment system.
        </p>
        <div className="payment-method">
          <div className="cardpayment">
            <CardInformation
              cardData={cardData}
              setRefresh={setRefresh}
              refresh={refresh}
              toggleModal={props?.toggleCardModal}
              addModal={props?.addCardModal}
              qs={props?.qs}
              args={{ ...args }}
            />
          </div>
          {/* <div className="bankpayment">
            <BankInformation
              bankData={accountsData}
              setRefresh={setRefresh}
              refresh={refresh}
              toggleModal={props?.toggleBankModal}
              addModal={props?.addBankModal}
              qs={props?.qs}
              args={{ ...args }}
            />
          </div> */}
        </div>
        <div className="dashed-border"></div>
        <h5 className="mb-12">{TRANSACTIONS?.label}</h5>

        {transactions?.count < 1 ? (
          <p>{TRANSACTIONS?.text}</p>
        ) : (
          <div className="facility-payment-detail">
            <DataTable
              columns={columns}
              data={transactions?.data}
            />
            <CustomPagination
              count={transactions?.count}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentInformation;
