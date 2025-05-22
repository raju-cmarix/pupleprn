import { AmericanExpressIcon, VisaIcon, MastercardIcon } from "assets/svg";
import { cardLastDigits, CARD_BRAND, CARD_SVG } from "constants/AppConstants";
import React from "react";
import CardBoxDropdown from "./CardBoxDropdown";
import { ReactComponent as DiscoverIcon } from "assets/images/icons/DiscoverIconTwo.svg";
import { ReactComponent as DinersclubIcon } from "assets/images/icons/DinersClubIcon.svg";
import { ReactComponent as UnionPayIcon } from "assets/images/icons/UnionPayIcon.svg";
import { ReactComponent as JCBIcon } from "assets/images/icons/JCBIcon.svg";
import bankLogo from "assets/images/icons/bank.png";

const CardBox = (props) => {
  const { card, bank } = props;

  const cardNumber = bank ? (
    <p>
      {`${bank?.bankName || ""} : ••••
      ${cardLastDigits(bank?.last4)}`}
    </p>
  ) : (
    <p>
      {`${
        CARD_SVG?.includes(card?.brand) ? CARD_BRAND[card?.brand] || "" : ""
      } : ••••
      ${cardLastDigits(card?.lastDigits)}`}
    </p>
  );
  const expiry = (
    <p>
      Expiration: {card?.expMonth}/{card?.expYear}
    </p>
  );

  return (
    <div className="card-box">
      <div className="cardicon-parent">
        <div className="card-icon">
          {bank ? (
            <>
              <img src={bankLogo} className="img-fluid" alt="bank logo" />
            </>
          ) : (
            CARD_SVG?.includes(card?.brand) && (
              <>
                {card?.brand === "amex" && <AmericanExpressIcon />}
                {card?.brand === "visa" && <VisaIcon />}
                {card?.brand === "mastercard" && <MastercardIcon />}
                {card?.brand === "discover" && <DiscoverIcon />}
                {card?.brand === "diners" && <DinersclubIcon />}
                {card?.brand === "unionpay" && <UnionPayIcon />}
                {card?.brand === "jcb" && <JCBIcon />}
              </>
            )
          )}
        </div>
        {card?.isPrimary && <p className="card-default">Default</p>}
        {bank?.isPrimary && <p className="card-default">Default</p>}
      </div>
      <div className="card-detail">
        {cardNumber}
        {bank ? <></> : expiry}
      </div>
      {!card?.isPrimary && (
        <CardBoxDropdown
          bank={bank}
          card={card}
          setRefresh={props?.setRefresh}
          refresh={props?.refresh}
        />
      )}
    </div>
  );
};

export default CardBox;
