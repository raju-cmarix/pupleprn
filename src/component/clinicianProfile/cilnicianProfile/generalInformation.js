import React, { useState, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import UserContext from "utils/context/UserContext";
import {
    facilityExp,
    patientExp,
} from "views/authentication/signUpClinician/HourlyConstant";

function GeneralInformation() {

    const [initData, setInitData] = useState({});
    const [otherFormErrors, setOtherFormErrors] = useState({});
    const { user } = useContext(UserContext);

    const [loader, setLoader] = useState(false);
    const [otherFormData, setOtherFormData] = useState({});
    const [arr, setArr] = useState([]);
    const [arr1, setArr1] = useState([]);

    const {
        register,
        reset,
        trigger,
        getValues,
        control,
        resetField,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            facilityExperience: facilityExp,
            patientExperience: patientExp,
        },
        licenseDetails: [{}],
    });

    const { fields } = useFieldArray({
        control,
        name: "facilityExperience",
    });

    const { fields: pEFields } = useFieldArray({
        control,
        name: "patientExperience",
    });

    // let values = { ...getValues(), ...otherFormData };

    // useEffect(() => {
    //     for (let i = 0; i < arr.length; i++) {
    //         if (!arr[i]) resetField(`facilityExperience[${i}].startTime`);
    //     }
    // }, [arr]);

    // useEffect(() => {
    //     for (let i = 0; i < arr1.length; i++) {
    //         if (!arr1[i]) resetField(`patientExperience[${i}].startTime`);
    //     }
    // }, [arr1]);

    // if (loaderValue === 14) {
    //     let facError = false;
    //     let tempF = values.facilityExperience.filter(
    //         (exp) => exp.isAvailable === true
    //     );

    //     if (!tempF.length) {
    //         obj = { ...obj, facilityExperience: "Facility experience is required" };
    //         facError = true;
    //     }
    //     for (let i = 0; i < tempF.length; i++) {
    //         if (!tempF[i].startTime) {
    //             obj = {
    //                 ...obj,
    //                 facilityExperience: "Facility experience is required",
    //             };
    //             facError = true;
    //         }
    //     }

    //     // patient error
    //     let patErr = false;
    //     let tempP = values.patientExperience.filter(
    //         (exp) => exp.isAvailable === true
    //     );

    //     if (!tempP.length) {
    //         obj = { ...obj, patientExperience: "Patient experience is required" };
    //         patErr = true;
    //     }
    //     for (let i = 0; i < tempP.length; i++) {
    //         if (!tempP[i].startTime) {
    //             obj = { ...obj, patientExperience: "Patient experience is required" };
    //             patErr = true;
    //         }
    //     }
    //     setOtherFormErrors({ ...obj });
    //     if (facError || patErr) return;
    // }


    return (
        <>
            <div className="general-content">
                <div className="first-block">
                    <div className="day-time-lang">
                        <div className="days-time">
                            <h3>Facility Experience</h3>
                            <ul>
                                <li>Outpatient 7 years</li>
                                <li>Outpatient 7 years</li>
                                <li>Outpatient 7 years</li>
                            </ul>
                        </div>
                        <div className="days-time">
                            <h3>Patient Experience</h3>
                            <ul>
                                <li>Ortho 2 years</li>
                                <li>Ortho 2 years</li>
                                <li>Ortho 2 years</li>
                            </ul>
                        </div>
                        {/* <Row className="facility">
                            <Col md={6}>
                                <h3>Facility Experience</h3>

                                <div className="days-available space">
                                    {fields.map((day, index) => {
                                        return (
                                            <div className="days" key={day.id}>
                                                <FormCheckbox
                                                    
                                                    control={control}
                                                    divClassName="weekdays"
                                                    className=""
                                                    name={`facilityExperience[${index}].isAvailable`}
                                                    id={`facilityExperience[${index}].isAvailable`}
                                                    options={[{ label: day.day, value: "true" }]}
                                                    register={register}
                                                    rules={{}}
                                                    errors={errors}
                                                />

                                                <div className="weektiming">
                                                    <FormSelect
                                                        // isDisabled={!arr[index]}
                                                        divClassName={"weekfrom"}
                                                        options={timeOptions}
                                                        placeholder="Select"
                                                        control={control}
                                                        name={`facilityExperience[${index}].startTime`}
                                                        id={`facilityExperience[${index}].startTime`}
                                                        errors={errors}
                                                        optionValue="value"
                                                        optionLabel="label"
                                                        rules={{}}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <FormError msg={otherFormErrors?.["facilityExperience"]} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <h3>Patient Experience</h3>
                                <div className="days-available">
                                    {pEFields.map((day, index) => {
                                        return (
                                            <div className="days" key={day.id}>
                                                <FormCheckbox
                                                   
                                                    control={control}
                                                    divClassName="weekdays"
                                                    className=""
                                                    name={`patientExperience[${index}].isAvailable`}
                                                    id={`patientExperience[${index}].isAvailable`}
                                                    options={[{ label: day.day, value: "true" }]}
                                                    register={register}
                                                    rules={{}}
                                                    errors={errors}
                                                />

                                                <div className="weektiming">
                                                    <FormSelect
                                                        // isDisabled={!arr1[index]}
                                                        divClassName={"weekfrom"}
                                                        options={timeOptions}
                                                        placeholder="Select"
                                                        control={control}
                                                        name={`patientExperience[${index}].startTime`}
                                                        id={`patientExperience[${index}].startTime`}
                                                        errors={errors}
                                                        optionValue="value"
                                                        optionLabel="label"
                                                        rules={{}}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <FormError msg={otherFormErrors?.["patientExperience"]} />
                                </div>
                            </Col>
                        </Row> */}
                        <div className="lang">
                            <h3>Languages</h3>
                            <ul>
                                <li>English</li>
                                <li>Spanish</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="block">
                    <h3>Education</h3>
                    <ul>
                        <li>Houston Community College Physical Therapy Assistant (PTA) School (2008)</li>
                        <li>College of Health Sciences, The University of Delaware DPT (2012)</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>Certification</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2008)</li>
                        <li>consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore (2010)</li>
                        <li>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat (2011)</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>Specialties</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2009)</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit (2009)</li>
                    </ul>
                </div>

                <div className="block">
                    <h3>Medical test</h3>
                    <ul>
                        <li>CPR: 20/12/2023</li>
                        <li>TB: 20/12/2023</li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default GeneralInformation;
