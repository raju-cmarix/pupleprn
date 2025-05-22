import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { DotIcon } from "assets/svg";

const BankAccountsDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleDefault = () => {};
  const handleRemove = () => {};

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={props}>
      <DropdownToggle className="p-0">
        <DotIcon />
      </DropdownToggle>
      <DropdownMenu id="card-menu">
        {props?.account?.accountStatus !== "active" && (
          <DropdownItem onClick={handleDefault}>Set Default</DropdownItem>
        )}
        <DropdownItem onClick={handleRemove}>Remove</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default BankAccountsDropdown;
