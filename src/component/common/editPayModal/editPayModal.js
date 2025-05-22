import React from "react";
import Select from "react-dropdown-select";
import { Cross } from "../../../assets/svg";
import './editPayModal.scss'


function EditPayModal() {

    const price = [
        { value: '60$/hr', label: '60$/hr' },
        { value: '80$/hr', label: '80$/hr' },
        { value: '100$/hr', label: '100$/hr' },
    ]

    return (
        <>
        <div className="paymodal">
            <h3>Edit Pay</h3> <Cross />
            <div className="pay-select">
                <label htmlFor="State">Hourly rate:</label>
                <Select options={price} />
            </div>
            <button className="pt-btn btn-primary ediypay-btn" type="button"
                color="primary"
            >Save</button>
        </div>
        </>
    );
}



export default EditPayModal;
