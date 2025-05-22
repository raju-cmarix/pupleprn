import React from 'react';
import Select from 'react-dropdown-select';

const CommonSelect = ({
  id,
  item,
  selectedValue,
  handleChange,
  HourlyConstants,
  nameValue,
  placeholder,
  clinician,
}) => {
  return (
    <div>
      <div className="signup-select ">
        <Select
          placeholder={placeholder} 
          values={selectedValue || []}
          id={id}
          style={{ width: '200px' }}
          options={HourlyConstants || clinician || []}
          onChange={(value) => handleChange(value, nameValue)}
        />
      </div>
    </div>
  );
};

export default CommonSelect;
