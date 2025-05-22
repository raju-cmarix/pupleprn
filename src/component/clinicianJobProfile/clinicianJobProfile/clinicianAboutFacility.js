import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import  AboutFacility1  from '../../../assets/images/about1.png'
import  AboutFacility2  from '../../../assets/images/about2.png'
import  AboutFacility3  from '../../../assets/images/about3.png'
import { AmericanExpressIcon, DotIcon, VisaIcon } from "../../../assets/svg";

function AboutFacility(direction, args) {
   
    return (
        <>
           <div className="general-content">
           {/* <div className="general-detail aboutfacility-photo"> 
           <h3>Facility photos</h3>
                    <div className="facility-images">
                        <div className="img"><img src={AboutFacility1} className="facilityimg" alt="AboutFacility1" /></div>
                        <div className="img"><img src={AboutFacility2} className="facilityimg" alt="AboutFacility1" /></div>
                        <div className="img"><img src={AboutFacility3} className="facilityimg" alt="AboutFacility1" /></div>
                    </div>
                </div> */}
                <div className="general-detail aboutfacility"> 
                    <ul>
                        <li><span>Number of clinicians currently at this facility: </span>60</li>
                        <li><span>Type(s) of patients: </span>ortho, Sports</li>
                        <li><span>What EMR do you use? </span>Clinicient, Raintree, Kareo</li>
                    </ul>
                </div>
            <div className="general-detail general-dress">
                <ul>
                    <li><span>Dress code: </span>Business casual, Athletic</li>
                    <li><span>What is the parking situation? </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                </ul>
            </div>
            </div>
          
        </>
    );
}

export default AboutFacility;
