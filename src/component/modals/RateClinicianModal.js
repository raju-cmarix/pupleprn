import { api } from "api/Api";
import StarRating from "component/jobPosting/starRating";
import { FEEDBACK_POST_URL } from "constants/ApiUrls";
import {
  RateRequired,
  RESPONSE_OK,
  TOAST_AUTO_CLOSE,
  USERROLE,
} from "constants/AppConstants";
import { useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import UserContext from "utils/context/UserContext";

export default function RateClinicianModal({
  modal,
  toggle,
  data,
  reviewFor,
  reviewBy,
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [disable, setDisable] = useState(false);
  const { user } = useContext(UserContext);

  const showToast = (msg) => {
    toast.error(msg, {
      transition: Slide,
      autoClose: TOAST_AUTO_CLOSE,
    });
  };

  const handleSubmit = async () => {
    setDisable(true);
    if (rating > 0) {
      const submitData = {
        reviewFor,
        reviewBy,
        rating,
        review,
        jobId: data?.jobId,
        jobAppliedUserId: data?.id,
        loginRoles: USERROLE(user),
      };

      api(FEEDBACK_POST_URL, { ...submitData }).then((res) => {
        setDisable(false);
        if (res.status === RESPONSE_OK) {
          toggle();
        }
      });
    } else {
      setDisable(false);
      showToast(RateRequired);
      // toggle();
    }
  };
  useEffect(() => {
    setRating(0);
    setReview("");
  }, [modal]);

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Rate & Review</ModalHeader>
      <ModalBody>
        <label className="font-12">
          Please rate this {user?.facilityId ? "Clinician" : "Facility"}:
        </label>
        <div className="star-section">
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div className="dashed-border my-4"></div>
        <div className="review-section mb-48">
          <div className="form-group">
            <label>Please write your feedback here (optional):</label>
            <textarea
              className="form-control h-auto"
              rows="4"
              onChange={(e) => setReview(e.target.value)}
              maxLength={999}
            ></textarea>
          </div>
        </div>
        <div className="text-center">
          <button
            className="pt-btn-small pt-btn btn-primary"
            onClick={handleSubmit}
            disabled={rating < 1 || disable}
          >
            Rate
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
