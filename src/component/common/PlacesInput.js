import { LocationPin } from "assets/svg";
import { AddressRules } from "constants/Rules";
import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { state } from "views/authentication/signUpClinician/HourlyConstant";
import FormError from "./FormError";

const PlacesInput = ({
  setValue,
  register,
  error,
  value,
  trigger,
  addressLine,
  addressState,
  addressZipcode,
  addressCity,
  lat,
  long,
  placeholder,
  label,
}) => {
  const [address, setAddress] = useState(value || "");

  useEffect(() => {
    setAddress(value || "");
  }, [value]);

  const handleAddressChange = (address) => {
    setAddress(address);
    setValue(addressLine, address);
    trigger &&
      trigger([addressLine, addressCity, addressState, addressZipcode]);
  };

  const handleAddressSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

    try {
      const results = await geocodeByAddress(selectedAddress);
      const addressComponents = results[0].address_components;

      const cityComponent = addressComponents.find((component) =>
        component.types.includes("locality"),
      );
      const city = cityComponent ? cityComponent.long_name : "";

      const stateComponent = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1"),
      );
      const stateCode = stateComponent ? stateComponent.short_name : null;
      const selectedState = state.find((s) => s.stateCode === stateCode);

      const zipComponent = addressComponents.find((component) =>
        component.types.includes("postal_code"),
      );
      const zipCode = zipComponent ? zipComponent.long_name : "";

      const countryComponent = addressComponents.find((component) =>
        component.types.includes("country"),
      );
      const country = countryComponent ? countryComponent.short_name + "A" : "";

      // Coordinates
      const coordinates = results[0]?.geometry?.location;

      // Replace city, stateCode, and zipCode from selectedAddress
      let formattedAddress = selectedAddress;
      // Remove city from the formatted address
      if (city) {
        const regExp = new RegExp(`(${city})`, "g");
        const matches = [...formattedAddress.matchAll(regExp)];
        if (matches.length === 1) {
          formattedAddress = formattedAddress.replace(regExp, "");
        } else if (matches.length >= 2) {
          let matchCount = 0;
          formattedAddress = formattedAddress.replace(regExp, (match) => {
            matchCount++;
            return matchCount === 2 ? "" : match;
          });
        }
      }
      const componentsToRemove = [stateCode, zipCode, country];
      componentsToRemove.forEach((comp) => {
        if (comp) {
          const regex = new RegExp(`(,?\\s*${comp}\\s*[,\\s]*)`, "g");
          formattedAddress = formattedAddress.replace(regex, "");
        }
      });
      // Remove extra spaces and commas from the formatted address
      formattedAddress = formattedAddress.replace(/,\s*$/, "").trim();

      if (coordinates) {
        lat && setValue(lat, coordinates?.lat());
        long && setValue(long, coordinates?.lng());
      }
      addressLine && setValue(addressLine, formattedAddress);
      addressZipcode && setValue(addressZipcode, zipCode);
      addressState && setValue(addressState, selectedState?.label || "");
      addressCity && setValue(addressCity, city);
      trigger &&
        trigger([addressLine, addressCity, addressState, addressZipcode]);
    } catch (error) {
      console.error("Error:", error);
      clearAddressState();
    }
  };

  const clearAddressState = () => {
    addressLine && setValue(addressLine, "");
    addressZipcode && setValue(addressZipcode, "");
    addressState && setValue(addressState, "");
    addressCity && setValue(addressCity, "");
    lat && setValue(lat, "");
    long && setValue(long, "");
  };

  useEffect(() => {
    if (!address) {
      clearAddressState();
    }
  }, [address]);

  return (
    <div className="form-group nick-name">
      {label && <label>{label}</label>}
      <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleAddressSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="office-address">
            <input
              {...register(addressLine, AddressRules)}
              {...getInputProps({
                placeholder: placeholder,
                className: error?.message
                  ? "form-control required autocomplete"
                  : "form-control",
              })}
              type="text"
            />
            <div className="autocomplete-dropdown-container">
              {loading && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <span style={{ fontSize: "12px" }}>Loading...</span>
                </div>
              )}
              {suggestions.map((suggestion) => {
                const className = `suggestion-item ${
                  suggestion.active ? "suggestion-item--active" : ""
                }`;
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion.placeId}
                    style={{
                      backgroundColor: suggestion.active
                        ? "#e6f6f4"
                        : "#FFFFFF",
                      cursor: "pointer",
                      padding: "10px",
                      fontSize: "12px",
                      border: "1px solid #E0E0E0",
                    }}>
                    <span className="mr-4">
                      <LocationPin />
                    </span>
                    <span className="suggestion-text">
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {error?.message && (
        <FormError
          msg={error?.message}
          className="autocomplete"
        />
      )}
    </div>
  );
};

export default PlacesInput;
