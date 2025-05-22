import React from "react";

function GeneralInformation() {

    return (
        <>
            <div className="general-content">
                <div className="general-detail">
                    <ul>
                        <li><span>Date & Time:</span> Jul 18 - 24 , 2022 10:30 - 16:30; Jul 25 - 27 , 2022 10:30 - 15:30</li>
                        <li><span>Location:</span> 806) 289-5948 Westway Canutillo McLaren, taxas (TX) 79835</li>
                        <li><span>Type of Facility:</span> Outpatient</li>
                        <li><span>Pay: $660</span> ($60 per hour)</li>
                        <li><span>Clinician type:</span> PTA</li>
                        <li><span>Experience:</span> 2 years</li>
                    </ul>
                </div>
            <div className="general-detail general-dress">
                <ul>
                    {/* <li><span>Dress code: </span>Business casual, Athletic</li> */}
                    <li><span>What is the parking situation? </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                </ul>
            </div>
            </div>
            
        </>
    );
}

export default GeneralInformation;
