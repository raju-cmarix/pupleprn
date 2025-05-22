import React from "react";
import BankBuilding from "assets/images/icons/bank.png";
import BankAccountsDropdown from "./BankAccountsDropdown";

const BankAccounts = (props) => {
  return (
    <div className="card-box">
      <div className="card-icon">
        <img src={BankBuilding} className="img-fluid" alt="bank" />
      </div>
      <div className="card-detail">
        <p>{props?.account?.bank_name}</p>
        <p>XXXXXXX{props?.account?.last4}</p>
      </div>
      {/* <BankAccountsDropdown account={props.account} /> */}
    </div>
  );
};

export default BankAccounts;
