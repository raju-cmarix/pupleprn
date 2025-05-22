import FormInput from "component/common/FormInput";
import FormQuill from "component/common/FormQuill";
import FormSelect from "component/common/FormSelect";
import { YearsOfPracticeString } from "constants/AppConstants";
import {
  AddressRules,
  CityRules,
  ClinicianTypeRules,
  HourlyRateRules,
  jobDescriptionRules,
  MinimumExperienceRules,
  StateRules,
  TypeOfFacilityRules,
  ZipCodeRules,
} from "constants/Rules";
import "react-quill/dist/quill.snow.css";
import { Col, Row } from "reactstrap";
import {
  clinician,
  experience,
  facilityTypeOptions,
  HourlyConstants,
  state,
} from "views/authentication/signUpClinician/HourlyConstant";

export default function AddJobPostingStepFirst({
  register,
  control,
  errors,
  trigger,
  selectedAddressData,
  setValue,
  wagesData,
}) {
  return (
    <Row>
      <Col md={12}>
        <FormSelect
          name={"facilityType"}
          id={"facilityType"}
          label="Facility type:"
          register={register}
          rules={TypeOfFacilityRules}
          options={facilityTypeOptions}
          errors={errors}
          placeholder="Select"
          // defaultvalue={jobFacilityType}
          control={control}
          optionValue="value"
          optionLabel="label"
          trigger={trigger}
        />
      </Col>
      <Col md={12}>
        <FormSelect
          name={"clinicianType"}
          id={"clinicianType"}
          label="Clinician type:"
          register={register}
          rules={ClinicianTypeRules}
          options={clinician}
          errors={errors}
          placeholder="Select"
          // defaultvalue={jobClinicianType}
          control={control}
          optionValue="value"
          optionLabel="label"
          trigger={trigger}
        />
      </Col>
      <Col md={12}>
        <FormSelect
          name={"hourlyRate"}
          id={"hourlyRate"}
          label="Hourly rate:"
          register={register}
          rules={HourlyRateRules}
          options={HourlyConstants}
          errors={errors}
          placeholder="Select"
          control={control}
          optionValue="value"
          optionLabel="label"
          trigger={trigger}
        />
      </Col>
      {wagesData && wagesData?.rate && (
        <div
          style={{
            fontSize: "13px",
            color: "#80798B",
            lineHeight: "12px",
          }}
        >
          <p className="mb-2">
            Median hourly rate in your area: ${wagesData.rate}/hr
          </p>
          <p className="mb-2">
            Number of open shifts in your area: {wagesData.countOfOpenPosition}
          </p>
          <p
            style={{
              fontSize: "12px",
              marginBottom: "5px",
              color: "red",
              lineHeight: "12px",
            }}
          >
            Hourly rates lower than ${wagesData.rate}/hr have a{" "}
            {wagesData.fillPercentage}% fill rate
          </p>
        </div>
      )}
      <Col md={12}>
        <FormSelect
          name={"minimumExperince"}
          id={"minimumExperince"}
          label={`${YearsOfPracticeString}:`}
          register={register}
          rules={MinimumExperienceRules}
          options={experience}
          errors={errors}
          placeholder="Select"
          defaultvalue={1}
          control={control}
          optionValue="value"
          optionLabel="label"
          trigger={trigger}
        />
        <div className="dashed-border"></div>
      </Col>
      <Col md={12}>
        <FormInput
          name={"nickname"}
          id={"nickname"}
          type={"text"}
          label={"Nickname:"}
          register={register}
          rules={AddressRules}
          errors={errors}
          divClassName={"form-group"}
          placeholder="Location Nickname"
          disabled={true}
        />
        <FormInput
          name={"jobAddress1"}
          id={"jobAddress1"}
          type={"text"}
          label={"Address:"}
          register={register}
          rules={AddressRules}
          errors={errors}
          divClassName={"form-group"}
          placeholder="Address line 1"
        />
        <FormInput
          name={"jobAddress2"}
          id={"jobAddress2"}
          type={"text"}
          register={register}
          rules={{}}
          errors={errors}
          divClassName={"office-address form-group"}
          placeholder="Address line 2"
        />
      </Col>
      <Col md={4}>
        <FormInput
          name={"city"}
          id={"city"}
          type={"text"}
          label={"City:"}
          register={register}
          rules={CityRules}
          errors={errors}
        />
      </Col>
      <Col md={4}>
        <FormSelect
          divClassName={"form-group"}
          options={state}
          placeholder="Select"
          control={control}
          name={"state"}
          errors={errors}
          optionValue="value"
          optionLabel="label"
          rules={StateRules}
          label="State:"
          trigger={trigger}
        />
      </Col>
      <Col md={4}>
        <FormInput
          name={"zipCode"}
          id={"zipCode"}
          type={"number"}
          label={"Zip code:"}
          register={register}
          rules={ZipCodeRules}
          errors={errors}
        />
      </Col>
      <Col md={12}>
        <FormQuill
          label="Shift Description:"
          name="jobDescription"
          control={control}
          register={register}
          trigger={trigger}
          rules={jobDescriptionRules}
          customModules={{
            toolbar: false,
          }}
          errors={errors}
        />
      </Col>
    </Row>
  );
}
