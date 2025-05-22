import { Card, CardBody } from "reactstrap";

export default function AddJobPostingLocationStep({
  facidata,
  clinicianType,
  selectedAddressIndex,
  setSelectedAddressIndex,
  setSelectedAddressData,
  getMedianWage,
}) {
  const handleUniqueAddressClick = (index, uniqueAddress) => {
    setSelectedAddressIndex(index);
    setSelectedAddressData(uniqueAddress);
    getMedianWage(uniqueAddress?.zipCode, clinicianType);
  };

  const uniqueAddressArray = facidata?.addresses || [];
  return (
    <div
      style={{
        display: "grid",
        gridAutorows: "1fr",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}>
      {uniqueAddressArray.map((uniqueAddress, index) => (
        <Card
          key={index}
          style={{
            cursor: "pointer",
            background: selectedAddressIndex === index ? "#caf4e8" : "white",
            border:
              selectedAddressIndex === index
                ? "1px solid green"
                : "1px solid #6c757d",
            borderRadius: "8px",
            padding: "5px",
          }}
          className={`office-address-card`}
          onClick={() => handleUniqueAddressClick(index, uniqueAddress)}>
          <CardBody>
            <p style={{ fontWeight: "bold" }}>{uniqueAddress?.nickname}</p>
            <p>{uniqueAddress.address1}</p>
            <p>{uniqueAddress.address2}</p>
            <p>
              {facidata?.city ? facidata?.city + ", " : ""}
              {uniqueAddress.state},{uniqueAddress?.zipCode ? " " + uniqueAddress.zipCode : ""}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
