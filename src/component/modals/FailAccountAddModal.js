import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { STRIPE_CONNECT } from "constants/ApiUrls";
import { STRIPE, STRIPE_SECOND_BUTTON } from "constants/AppConstants";
import React, { useContext } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import UserContext from "utils/context/UserContext";

const FailAccountAdd = (
  { isOpen, toggle, getLink, link, loader, setLoader },
  args
) => {
  const { user } = useContext(UserContext);
  const stripeConnect = () => {
    setLoader(true);
    api(STRIPE_CONNECT, { userId: user?.id }).then((response) => {
      getLink(response?.data?.data);
      setLoader(false);
      // getLink(response?.data);
    });
  };
  return (
    <Modal
      centered
      isOpen={isOpen}
      toggle={toggle}
      {...args}
      className="stripe-connect"
    >
      <ModalHeader toggle={toggle}>Failed to add bank account</ModalHeader>
      <ModalBody>
        <p>
          {!link
            ? `It seems like the process of adding a new account isn't completed,
            Due to some error. Do you want to try again?`
            : `Click on this link to connect your account, this link is valid for 5 mins only`}
        </p>
        <div className="stripe-note">
          <span>Note: </span>
          <p>
            {` Please keep handy your bank account details, social security number,
            ID proof image/document. All fields are compulsory.`}
          </p>
        </div>
        {/* <Row>
                        <Col md={12}>
                            <div className="form-group w-100">
                                <label htmlFor="cardnumber">Card Number:</label>
                                <Input id="cardnumber" type="number" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="Expiration">Expiration:</label>
                                <Flatpickr className="form-control" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="CVV">CVC/CVV:</label>
                                <Input id="CVV" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="firstname">First Name:</label>
                                <Input id="firstname" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="Last Name">Last Name:</label>
                                <Input id="Last Name" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="Zipcde">Zipcde:</label>
                                <Input id="Zipcde" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group mb-4">
                                <label htmlFor="Region">Country/Region:</label>
                                <Input id="Region" />
                            </div>
                        </Col>
                    </Row> */}
        <div className="model-footer">
          {!link ? (
            <FormButton
              className="pt-btn-small pt-btn btn-primary"
              loader={loader}
              label={`${STRIPE} Connect`}
              type="button"
              onClick={stripeConnect}
            />
          ) : (
            <a href={link} style={{ textDecoration: "none" }}>
              <button className="pt-btn-small pt-btn btn-primary">
                {STRIPE_SECOND_BUTTON}
              </button>
            </a>
          )}
          {/* <a href={link} target="_blank" rel="noreferrer"> */}

          <button className="pt-btn btn-gray pt-btn-small" onClick={toggle}>
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default FailAccountAdd;
