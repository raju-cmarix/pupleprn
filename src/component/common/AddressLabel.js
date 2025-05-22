import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { random } from "radash";

// Function to truncate text to a specified length
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
};

// AddressLabel Component
const AddressLabel = ({ arr, maxLength = 50 }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [uid] = useState(`id-${random(1, 7000)}`);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const nickname = arr?.[0]?.jobAddressNickname;

  const fullAddress = arr
    .map((item) => {
      const part1 = item.jobAddress1 || "";
      const part2 = item.jobAddress2 ? `, ${item.jobAddress2}` : "";
      const part3 = item.city ? `, ${item.city}` : "";
      const part4 = item.state ? `, ${item.state}` : "";
      const part5 = item.zipCode ? ` - ${item.zipCode}` : "";
      return `${part1}${part2}${part3}${part4}${part5}`;
    })
    .join("; ");

  const displayText = nickname || truncateText(fullAddress, maxLength);

  return (
    <>
      <span
        id={uid}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}>
        {displayText}
      </span>
      <Tooltip
        isOpen={tooltipOpen}
        target={uid}
        toggle={toggleTooltip}
        placement="bottom"
        autohide={false}>
        {fullAddress}
      </Tooltip>
    </>
  );
};

export default AddressLabel;
