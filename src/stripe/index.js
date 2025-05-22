import React, { useState } from "react";
import {
  Elements,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Row } from "reactstrap";
import { api } from "api/Api";
import {
  ADD_CARD_ON_SERVER_URL,
  GET_PAYMENT_INTENTS_URL,
} from "constants/ApiUrls";
import FormButton from "component/common/FormButton";
const CheckoutForm = ({ setCardDetails, setPreviewCard, customerDetails }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    const payload = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${process.env.REACT_APP_BASENAME_URL}/account`,
      },
    });
    if (payload.error) {
      setLoading(false);
      setErrorMessage(payload.error.message);
    } else {
      // getCardDetails();
      setErrorMessage(null);
    }
  };
  // const getCardDetails = () => {
  //   setLoading(true);
  //   api(GET_PAYMENT_INTENTS_URL, {}).then((res) => {
  //     if (
  //       !res.data.error &&
  //       res.data.data.data.data &&
  //       res.data.data.data.data[0]
  //     ) {
  //       const reqObj = {
  //         ...res.data.data.data.data[0].card,
  //         id: res.data.data.data.data[0].id,
  //         name: customerDetails.firstName + " " + customerDetails.lastName,
  //       };
  //       api(ADD_CARD_ON_SERVER_URL, reqObj).then((resp) => {
  //         if (!resp.data.error) {
  //           setCardDetails({
  //             id: reqObj.id,
  //             ...res.data.data.data.data[0].card,
  //             billing_details: {
  //               name: reqObj.name,
  //             },
  //           });
  //           setPreviewCard();
  //         }
  //         setLoading(false);
  //       });
  //     }
  //     setLoading(false);
  //   });
  // };
  return (
    <>
      <form onSubmit={handleSubmit} className="stripe-iframe">
        <Row>
          <PaymentElement />
          {errorMessage && (
            <div>
              <span className="error-msg">{errorMessage}</span>
            </div>
          )}
        </Row>
        <div className="mt-2">
          <FormButton
            loader={loading}
            className="minh50 minw120 rounded-full"
            label="Add Card"
            type={"submit"}
            disabled={!stripe}
          />
        </div>
      </form>
    </>
  );
};
const AddCreditCardFormStripe = ({
  setupIntentObj,
  setCardDetails,
  setPreviewCard,
  customerDetails,
}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const options = {
    // passing the client secret obtained in step 2
    // clientSecret: setupIntentObj.client_secret,
    clientSecret:
      "pi_3MOGcJF7BQPKojkd0njYXl2h_secret_UuJrr31qyIMSQRrPIgnBVvuKM",
  };
  return (
    <>
      {options.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            customerDetails={customerDetails}
            setCardDetails={setCardDetails}
            setPreviewCard={setPreviewCard}
          />
        </Elements>
      )}
    </>
  );
};
export default AddCreditCardFormStripe;
