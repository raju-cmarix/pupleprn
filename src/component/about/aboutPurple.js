import React from "react";
import './about.scss'
import MainImage from '../../assets/images/icons/main-vector.svg'

function AboutPurple() {
    return (
        <>
            <div className="about-purple">
                <div className="custom-container">
                    <h2>About Purple <span>PRN</span></h2>
                    <div className="about-purple-content">
                        <div className="about-text">
                            <p>Our founder, a physical therapist, clinic director, and efficiency evangelist was in charge of finding coverage for coworkers taking time off.  He was frustrated with the limited options for coverage, poor customer service, and archaic communication methods with the physical therapy staffing agencies. It seemed egregious for these companies to upcharge 50% on the PT’s or PTA’s hourly rate.</p>
                            <p>When coworkers wanted time off he found himself spending hours texting, calling, emailing, and faxing (yes...faxing) to coordinate paperwork, schedules, EMR training, dress code, arrival time, etc.</p>
                            <p>Elon is launching cars into space and we still have to fax paperwork and wait days to confirm coverage? There had to be a better way! Thus, Purple PRN was born.</p>
                            <p>Our team includes diverse backgrounds from engineering, tech, physical therapy, business, insurance, legal, and marketing. We’re working together to take PRN staffing for therapy professionals out of the dark ages.</p>
                         </div>
                        <div className="about-img">
                            <img src={MainImage} alt={MainImage} height="311" width="375" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPurple;
