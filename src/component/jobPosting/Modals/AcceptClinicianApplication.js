import FormButton from "component/common/FormButton";
import {
  AcceptClinicianApplicationTexts,
  cardLastDigits,
  CARD_SVG,
  PaymentMethods,
  PERCENTAGE,
  PURPLEPT_SERVICE_CHARGES,
  StripeCharges,
  uuid,
} from "constants/AppConstants";
import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledTooltip,
} from "reactstrap";
import BackArrow from "assets/images/icons/arrow.png";
import Info from "assets/images/icons/info.png";
import { AmericanExpressIcon, MastercardIcon, VisaIcon } from "assets/svg";
import { ReactComponent as DiscoverIcon } from "assets/images/icons/DiscoverIconTwo.svg";
import { ReactComponent as DinersclubIcon } from "assets/images/icons/DinersClubIcon.svg";
import { ReactComponent as UnionPayIcon } from "assets/images/icons/UnionPayIcon.svg";
import { ReactComponent as JCBIcon } from "assets/images/icons/JCBIcon.svg";
import "../../accountSettings/accountSettings.scss";
import bankLogo from "assets/images/icons/bank.png";
import { isEmpty } from "radash";
import { compareSimpleObjs } from "utils/Utils";
import { useNavigate } from "react-router-dom";

const AcceptClinicianModal = (props) => {
  const [defaultCard, setDefaultCard] = useState(props?.defaultCard || {});
  const navigate = useNavigate();
  const [defaultAccount, setDefaultAccount] = useState(
    props?.defaultAccount || {},
  );

  const cardNumber = (card, bank) => (
    <p>
      {bank
        ? `${card?.bankName} - `
        : AcceptClinicianApplicationTexts?.cardNumber}
      {cardLastDigits(bank ? card?.last4 : card?.lastDigits)}
    </p>
  );
  const expiry = (card) => (
    <p>
      {AcceptClinicianApplicationTexts?.expiration} {card?.expMonth}/
      {card?.expYear}
    </p>
  );

  const defaultCardSet = (card) => setDefaultCard({ ...card });
  const defaultAccountSet = (card) => setDefaultAccount({ ...card });
  const totalShiftPay = (
    <div className="total-pay">
      <p>
        {AcceptClinicianApplicationTexts?.totalShiftPay}
        <span>
          $
          {props?.hourlyRate ||
            Number(props?.totalAmount) / Number(props?.totalWorkedHours)}{" "}
          per hour x {props?.totalWorkedHours} hour
          {props?.totalWorkedHours >= 2 ? "s" : ""}
        </span>
      </p>
      <span>${props?.totalAmount}</span>
    </div>
  );

  const purplePTServiceChargePay = PERCENTAGE(
    Number(props?.totalAmount),
    PURPLEPT_SERVICE_CHARGES,
  );

  const totalAmountAndServiceCharge =
    purplePTServiceChargePay + Number(props?.totalAmount);

  const StripeAdditionPay = props?.bankTransfer
    ? 0
    : StripeCharges(totalAmountAndServiceCharge);

  let grandTotalPay = Number(
    Number(totalAmountAndServiceCharge) + Number(StripeAdditionPay),
  ).toFixed(2);

  let grandTotalPayString = "";

  if (grandTotalPay % 1 !== 0) {
    const before = grandTotalPay?.toString()?.split(".")[0];
    let after = Number(grandTotalPay?.toString()?.split(".")[1]);

    if (after < 10) {
      after *= 10;
      grandTotalPayString = before + `.${after}`;
    } else {
      grandTotalPayString = grandTotalPay;
    }
  } else {
    grandTotalPayString = grandTotalPay;
  }

  const purplePTServiceCharge = (
    <div className="total-pay">
      <p>
        {AcceptClinicianApplicationTexts?.serviceFee}
        <span>
          {props?.bankTransfer
            ? AcceptClinicianApplicationTexts?.serviceFeeAccountCharges
            : AcceptClinicianApplicationTexts?.serviceFeeCharges}
        </span>
      </p>
      <span>
        $
        {Number(
          Number(purplePTServiceChargePay) + Number(StripeAdditionPay),
        )?.toFixed(2)}
      </span>
    </div>
  );

  const grandTotal = (
    <div className="total-pay">
      <p>{AcceptClinicianApplicationTexts?.totalPay}</p>
      <span>${grandTotalPayString}</span>
    </div>
  );

  useEffect(() => {
    if (!compareSimpleObjs(props?.defaultAccount, defaultAccount)) {
      setDefaultAccount({ ...props?.defaultAccount });
    }
  }, [props?.defaultAccount]);

  return (
    <Modal
      centered
      isOpen={props?.isOpen}
      toggle={props?.toggle}
      className="Pay-and-get">
      <ModalHeader toggle={props?.toggle}>
        <FormButton
          className="pt-btn btn-secondary pt-btn-small back-btn"
          onClick={() => {
            props?.setAccept(1);
          }}
          icon={
            <img
              src={BackArrow}
              alt="Back"
            />
          }
          iconPosition="left"
        />
        {AcceptClinicianApplicationTexts?.header}
      </ModalHeader>
      {!props?.bankTransfer ? (
        <ModalBody>
          <div className="slip">
            <p>
              <span>
                {AcceptClinicianApplicationTexts?.shiftPaymentDetails}
              </span>{" "}
              <br />
              {AcceptClinicianApplicationTexts?.shiftId} {props?.jobId}
            </p>
            <div className="top-detail">
              <div className="amount-paid">
                <p>{AcceptClinicianApplicationTexts?.amountToPaid}</p>
                <span>${grandTotalPayString}</span>
              </div>
              <div className="amount-paid">
                <p>{AcceptClinicianApplicationTexts?.paymentMethod}</p>
                <span>
                  <div className="card-img">
                    {CARD_SVG?.includes(defaultCard?.brand) && (
                      <>
                        {defaultCard?.brand === "amex" && (
                          <AmericanExpressIcon />
                        )}
                        {defaultCard?.brand === "visa" && <VisaIcon />}
                        {defaultCard?.brand === "mastercard" && (
                          <MastercardIcon />
                        )}
                        {defaultCard?.brand === "discover" && <DiscoverIcon />}
                        {defaultCard?.brand === "diners" && <DinersclubIcon />}
                        {defaultCard?.brand === "unionpay" && <UnionPayIcon />}
                        {defaultCard?.brand === "jcb" && <JCBIcon />}
                      </>
                    )}
                  </div>
                  -{cardLastDigits(defaultCard?.lastDigits)}
                </span>
              </div>
            </div>
            <div className="total-summary">
              <p>{AcceptClinicianApplicationTexts?.summary}</p>
              <div className="total-shift-charges">
                <div className="total-shift">
                  {totalShiftPay}
                  {purplePTServiceCharge}
                </div>

                <div className="total-shift">{grandTotal}</div>
              </div>
            </div>

            <p className="slip-footer">
              {AcceptClinicianApplicationTexts?.stripe}
            </p>
          </div>
          <div className="payment-method">
            {/* <p>{AcceptClinicianApplicationTexts?.selectPayment}</p>
            <div className="card-details">
              <div className="card">
                <div>
                  <img src={Card} alt="card" />
                  <p>{AcceptClinicianApplicationTexts?.card}</p>
                </div>
              </div>
            </div> */}
            <div className="select-card bank-card">
              <p>{AcceptClinicianApplicationTexts?.selectCard}</p>
              <img
                src={Info}
                id="infotooltip"
                alt="info"
              />
              <UncontrolledTooltip
                placement="bottom"
                target="infotooltip"
                id="card-tip">
                {AcceptClinicianApplicationTexts?.manageCards}
              </UncontrolledTooltip>
            </div>
            <div className="cards">
              {props?.cards &&
                props?.cards?.length > 0 &&
                props?.cards?.map((card, index) => (
                  <div
                    className="card-number"
                    onClick={() => defaultCardSet(card)}
                    id={`Cardnumber_${index}`}
                    key={uuid()}>
                    <div
                      className="pt-radio"
                      style={{
                        cursor: !card?.isPrimary ? "pointer" : "default",
                      }}>
                      <Input
                        type="radio"
                        className="form-check-input"
                        name="Cardnumber"
                        id={`Cardnumber_${index}`}
                        checked={card?.id === defaultCard?.id}
                      />
                      <label for="Cardnumber_1">
                        <div className="card-box">
                          <div className="cardicon-parent">
                            <div className="card-icon">
                              {CARD_SVG?.includes(card?.brand) && (
                                <>
                                  {card?.brand === "amex" && (
                                    <AmericanExpressIcon />
                                  )}
                                  {card?.brand === "visa" && <VisaIcon />}
                                  {card?.brand === "mastercard" && (
                                    <MastercardIcon />
                                  )}
                                  {card?.brand === "discover" && (
                                    <DiscoverIcon />
                                  )}
                                  {card?.brand === "diners" && (
                                    <DinersclubIcon />
                                  )}
                                  {card?.brand === "unionpay" && (
                                    <UnionPayIcon />
                                  )}
                                  {card?.brand === "jcb" && <JCBIcon />}
                                </>
                              )}
                            </div>
                            {card?.id === defaultCard?.id && (
                              <p className="card-default">Default</p>
                            )}
                          </div>
                          <div className="card-detail">
                            <p>{cardNumber(card)}</p>
                            <p>{expiry(card)}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
            </div>
            <div className="payment-footer">
              <button
                className="pt-btn btn-gray pt-btn-small"
                onClick={props?.toggle}>
                Cancel
              </button>
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                onClick={() => {
                  props?.handleApplication({
                    purplePTCharges: purplePTServiceChargePay,
                    stripeCharges: Number(StripeAdditionPay),
                    grandTotal: Number(grandTotalPay),
                    defaultCard,
                    paymentMethod: PaymentMethods?.Card,
                  });
                }}
                loader={props?.loading}
                label={`Confirm & Pay`}
              />
            </div>
          </div>

          <div className="model-footer">
            <span>{AcceptClinicianApplicationTexts?.noteText}</span>
            <p>{AcceptClinicianApplicationTexts?.note}</p>
          </div>
        </ModalBody>
      ) : (
        <ModalBody>
          <div className="slip">
            <p>
              <span>
                {AcceptClinicianApplicationTexts?.shiftPaymentDetails}
              </span>{" "}
              <br />
              {AcceptClinicianApplicationTexts?.shiftId} {props?.jobId}
            </p>
            <div className="top-detail">
              <div className="amount-paid">
                <p>{AcceptClinicianApplicationTexts?.amountToPaid}</p>
                <span>${grandTotalPayString}</span>
              </div>
              <div className="amount-paid">
                <p>{AcceptClinicianApplicationTexts?.paymentMethod}</p>
                <span>
                  <div className="card-img">
                    Bank -{" "}
                    <img
                      src={bankLogo}
                      className="img-fluid"
                      alt="bank logo"
                    />
                  </div>
                  {cardLastDigits(defaultAccount?.last4)}
                </span>
              </div>
            </div>
            <div className="total-summary">
              <p>{AcceptClinicianApplicationTexts?.summary}</p>
              <div className="total-shift-charges">
                <div className="total-shift">
                  {totalShiftPay}
                  {purplePTServiceCharge}
                </div>

                <div className="total-shift">{grandTotal}</div>
              </div>
            </div>

            <p className="slip-footer">
              {AcceptClinicianApplicationTexts?.stripeACH}
            </p>
          </div>
          <div className="payment-method">
            <div className="select-card bank-card">
              <p>Bank payment</p>
            </div>
            <div className="cards">
              {props?.achPaymentLink
                ? AcceptClinicianApplicationTexts?.ACHLINKTEXT
                : AcceptClinicianApplicationTexts?.ACHAccountConnectText}
            </div>
            <div className="payment-footer">
              <button
                className="pt-btn btn-gray pt-btn-small"
                onClick={props?.toggle}>
                Cancel
              </button>
              {props?.achPaymentLink ? (
                <a
                  href={props?.achPaymentLink}
                  className="pt-btn btn-primary pt-btn-small"
                  disabled={!props?.achPaymentLink}>
                  {AcceptClinicianApplicationTexts?.ACHPaymentLinkButton}
                </a>
              ) : (
                <FormButton
                  className="pt-btn btn-primary pt-btn-small"
                  onClick={() => {
                    props?.handleApplication({
                      purplePTCharges: purplePTServiceChargePay,
                      stripeCharges: Number(StripeAdditionPay),
                      grandTotal: Number(grandTotalPay),
                      defaultCard,
                      defaultAccount,
                      paymentMethod: props?.bankTransfer
                        ? PaymentMethods?.ACH
                        : PaymentMethods?.Card,
                    });
                  }}
                  loader={props?.loading}
                  label={
                    props?.bankTransfer
                      ? AcceptClinicianApplicationTexts?.ACHPayButton
                      : AcceptClinicianApplicationTexts?.CardPayButton
                  }
                  disabled={props?.bankTransfer ? false : isEmpty(defaultCard)}
                />
              )}
            </div>
          </div>

          <div className="model-footer">
            <span>{AcceptClinicianApplicationTexts?.noteText}</span>
            <p>{AcceptClinicianApplicationTexts?.note}</p>
          </div>
        </ModalBody>
      )}
    </Modal>
  );
};

export default AcceptClinicianModal;
