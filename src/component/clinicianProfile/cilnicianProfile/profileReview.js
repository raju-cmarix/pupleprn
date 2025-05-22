import React from "react";
import { ReviewIcon, BigStar } from "../../../assets/svg";
import ReviewIconImg from '../../../assets/images/icons/review-medical-icon.svg'
import CustomPagination from "../../common/customPagination";

function ReviewProfile() {


    return (
        <>
            <div className="general-content review-content">
                <div className="review-cards">
                    <div className="card">
                        <h3><span><img src={ReviewIconImg} alt="ReviewIconImg" /></span>Edinburg Regional Medical Center </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className="card-btm">
                            <div className="reviewrating"><span>< BigStar /></span>4/5</div>
                            <div className="reviewdate">Jun 9, 2022</div>
                        </div>
                    </div>
                    <div className="card">
                        <h3><span>< ReviewIcon /></span>McAllen Medical Center </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <div className="card-btm">
                            <div className="reviewrating"><span>< BigStar /></span>4/5</div>
                            <div className="reviewdate">Jun 9, 2022</div>
                        </div>
                    </div>
                    <div className="card">
                        <h3><span>< ReviewIcon /></span>McAllen Medical Center </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <div className="card-btm">
                            <div className="reviewrating"><span>< BigStar /></span>4/5</div>
                            <div className="reviewdate">Jun 9, 2022</div>
                        </div>
                    </div>
                    <div className="card">
                        <h3><span>< ReviewIcon /></span>McAllen Medical Center </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <div className="card-btm">
                            <div className="reviewrating"><span>< BigStar /></span>4/5</div>
                            <div className="reviewdate">Jun 9, 2022</div>
                        </div>
                    </div>
                    <div className="card">
                        <h3><span>< ReviewIcon /></span>McAllen Medical Center </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <div className="card-btm">
                            <div className="reviewrating"><span>< BigStar /></span>4/5</div>
                            <div className="reviewdate">Jun 9, 2022</div>
                        </div>
                    </div>
                <CustomPagination />
                </div>
            </div>
        </>
    );
}

export default ReviewProfile;
