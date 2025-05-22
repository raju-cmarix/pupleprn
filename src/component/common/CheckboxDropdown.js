import React from "react";
import styled from "@emotion/styled";
import Select from "react-dropdown-select";
import { adminUserTypes } from "views/authentication/signUpClinician/HourlyConstant";

const ItemRenderer = ({ options, title, onChange }) => (
  <React.Fragment>
    <Select
      multi
      options={adminUserTypes}
      placeholder={"Select"}
      values={[]}
      itemRenderer={({ item, methods }) => (
        <StyledItem>
          {item.disabled ? (
            <div aria-disabled>{item.label}</div>
          ) : (
            <div onClick={() => methods.addItem(item)} className="checkbox">
              <input
                onChange={() => methods.addItem(item)}
                type="checkbox"
                checked={methods.isSelected(item)}
                className="form-check-input"
              />{" "}
              {item.label}
            </div>
          )}
        </StyledItem>
      )}
      onChange={(value) => onChange(value)}
      className="checkbox-dropdown"
    />
  </React.Fragment>
);

ItemRenderer.propTypes = {};

const StyledItem = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
  }
  input {
    margin-right: 10px;
  }
  :hover {
    background: #f2f2f2;
  }
`;

export default ItemRenderer;
