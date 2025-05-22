import React from "react";
import './about.scss'
import Value1 from '../../assets/images/icons/value1.svg'
import Value2 from '../../assets/images/icons/value2.svg'
import Value3 from '../../assets/images/icons/value3.svg'
import Value4 from '../../assets/images/icons/value4.svg'
import Value5 from '../../assets/images/icons/value5.svg'
import Value6 from '../../assets/images/icons/value6.svg'
import Value7 from '../../assets/images/icons/value7.svg'

function OurValues() {
    return (
        <>
            <div className="about-purple">
                <div className="custom-container">
                    <h2 className="d-block text-center">OUR <span>Values</span></h2>
                    <div className="about-value-content">
                    <div className="about-value-box reverse">
                        <div className="about-value-text">
                            <h3>Patient <span>Care</span></h3>
                            <p>As therapists we got into this industry to help our patients. By making it easier to find temporary help clinicians no longer have to endure the burden of having their schedules overloaded when the clinic gets busy or when a colleague takes PTO. Patients see the benefit of more individual attention and care.</p>
                        </div>
                        <div className="about-value-img">
                            <img src={Value1} alt={Value1} height="311" width="375" />
                        </div>
                    </div>
                    <div className="about-value-box">
                        <div className="about-value-img">
                            <img src={Value2} alt={Value2} height="311" width="375" />
                        </div>
                        <div className="about-value-text">
                            <h3>Work-Life <span>Balance</span></h3>
                            <p>Burnout is a very real concern for healthcare providers. We enable therapists to create their own schedules and make it easier for all therapists to take time off when they need it to care for themselves and the ones they love.</p>
                        </div>
                    </div>
                    <div className="about-value-box reverse">
                        <div className="about-value-text">
                            <h3>Financial <span>Opportunity</span></h3>
                            <p>In allied health, opportunities for financial advancement are scarce.  Most therapists are underpaid, especially those with advanced training, certifications, and specialties.  We think clinicians should have the option to set their price and this will enable the market to pay a premium to therapists who have dedicated themselves to improving their education and skills. Our minimal fees allow clinicians and clinics to keep more of their hard-earned money.</p>
                        </div>
                        <div className="about-value-img">
                            <img src={Value3} alt={Value3} height="311" width="375" />
                        </div>
                    </div>
                    <div className="about-value-box ">
                        <div className="about-value-img">
                            <img src={Value4} alt={Value4} height="311" width="375" />
                        </div>
                        <div className="about-value-text">
                            <h3>Efficiency</h3>
                            <p>We are committed to making the therapy staffing industry more efficient for clinics and clinicians by building a modern marketplace to ease the burden associated with PRN, temporary, and travel work.</p>
                        </div>
                    </div>
                    <div className="about-value-box reverse">
                        <div className="about-value-text">
                            <h3>Customer <span>Service</span></h3>
                            {/* <p>Every decision we make starts with our therapy professionals and facility operators.  Commitment to clients creates repeat customers and allows our therapists and facilities to flourish.</p> */}
                            <p>Every decision we make starts with our therapy professionals and facilities. Commitment to clients creates repeat customers and allows our therapists and facilities to flourish.</p>
                        </div>
                        <div className="about-value-img">
                            <img src={Value5} alt={Value5} height="311" width="375" />
                        </div>
                    </div>
                    <div className="about-value-box">
                        <div className="about-value-img">
                            <img src={Value6} alt={Value6} height="311" width="375" />
                        </div>
                        <div className="about-value-text">
                            <h3>Bold <span>Vision</span></h3>
                            {/* <p>We are dissatisfied with the status quo and you should be too. We embrace big ideas. Let us solve your staffing solutions or help you find work through our innovation and experimentation. </p> */}
                            <p>We are dissatisfied with the status quo and you should be too. We embrace big ideas. Let us solve your staffing issues or help you find work through our innovation and experimentation.</p>
                        </div>
                    </div>
                    <div className="about-value-box reverse">
                        <div className="about-value-text">
                            <h3>Integrity</h3>
                            <p>We are committed to honesty, trust, transparency, fairness, and honor.  We do the right thing — even when no one is watching.</p>
                        </div>
                        <div className="about-value-img">
                            <img src={Value7} alt={Value7} height="311" width="375" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurValues;
