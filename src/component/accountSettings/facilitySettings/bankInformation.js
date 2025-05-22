import CardBox from "component/paymentInformationDetails/CardBox";
import React from "react";
import AddAccount from "./Modals/AddAccount";
import AddCard from "./Modals/PaymentInformationModal";

const BankInformation = ({
  bankData,
  setRefresh,
  refresh,
  toggleModal,
  addModal,
  qs,
  args,
}) => {
  return (
    <>
      <h5>Connected bank accounts</h5>
      <div className="payment-cards">
        {bankData?.count > 0 &&
          bankData?.data?.map((bank) => (
            <CardBox
              key={bank?.id}
              setRefresh={setRefresh}
              refresh={refresh}
              bank={bank}
            />
          ))}
      </div>
      <div className="payment-block mt-2">
        <button className="btn-link" onClick={toggleModal}>
          + add bank account
        </button>
      </div>
      <AddAccount
        centered
        isOpen={addModal}
        toggle={toggleModal}
        qs={qs}
        {...args}
      />
    </>
  );
};

export default BankInformation;
