import CardBox from "component/paymentInformationDetails/CardBox";
import React from "react";
import AddCard from "./Modals/PaymentInformationModal";

const CardInformation = ({
  cardData,
  setRefresh,
  refresh,
  toggleModal,
  addModal,
  qs,
  args,
}) => {
  return (
    <>
      <h5>Connected Cards</h5>
      <div className="payment-cards">
        {cardData?.count > 0 &&
          cardData?.data?.map((card) => (
            <CardBox
              card={card}
              key={card?.id}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
      </div>
      <div className="payment-block mt-2">
        <button className="btn-link" onClick={toggleModal}>
          + add card
        </button>
      </div>
      <AddCard
        centered
        isOpen={addModal}
        toggle={toggleModal}
        qs={qs}
        {...args}
      />
    </>
  );
};

export default CardInformation;
