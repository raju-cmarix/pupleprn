import { useEffect } from 'react';
import { DownArrow, Options } from 'assets/svg';
import FormSelect from 'component/common/FormSelect';
import {
  ClinicianTypeRules,
  fillPercentageRules,
  HourlyRateRules,
  radiusRules,
  ZipCodeRules,
} from 'constants/Rules';
import { capitalize } from 'lodash';
import {
  clinician,
  HourlyConstants,
  PercentageContstants,
  RadiusConstants,
} from 'views/authentication/signUpClinician/HourlyConstant';
import {
  Row,
  Form,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import FormCheckbox from 'component/common/FormCheckbox';
import { useForm } from 'react-hook-form';
import FormInput from 'component/common/FormInput';

const MedianRateForm = ({
  item,
  deleteLocationModal,
  setDeleteLocationModal,
  setSelectedItemForDelete,
  handleChange,
  index,
  filters,
  setFilters,
}) => {
  const {
    register,
    trigger,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      isActive: item.isActive,
      rate: String(item.rate),
      fillPercentage: String(item.fillPercentage),
      clinicianType: String(item.clinicianType),
      zipcode: String(item.zipcode),
      radius: String(item.radius),
    },
  });

  const zipcode = watch('zipcode');
  useEffect(async () => {
    const result = await trigger();
    if (result) {
      handleChange({
        id: item.id,
        metroAreaName: item.metroAreaName,
        ...getValues(),
      });
    }
  }, [zipcode]);

  return (
    <div>
      <Form>
        <Container className="py-2">
          <Row className="d-flex flex-row align-items-center gap-2">
            <Col>
              {index === 0 && (
                <div className="filters">
                  <p>Metro Area</p>
                  <p className="hourly-btn">
                    <span
                      className={`uparrow ${
                        (filters.direction === 'aToZ' || !filters?.direction) &&
                        'active'
                      }`}
                      onClick={() =>
                        setFilters({
                          direction: 'aToZ',
                        })
                      }>
                      <DownArrow />
                    </span>
                    <span
                      className={`down ${
                        filters.direction === 'zToA' && 'active'
                      }`}
                      onClick={() => {
                        setFilters({
                          direction: 'zToA',
                        });
                      }}>
                      <DownArrow />
                    </span>
                  </p>
                </div>
              )}
              <div className="d-flex align-items-center justify-content-between mx-1">
                <FormCheckbox
                  changeCallback={() => {
                    trigger();
                    handleChange({
                      id: item.id,
                      metroAreaName: item.metroAreaName,
                      ...getValues(),
                    });
                  }}
                  control={control}
                  divClassName="weekdays d-flex align-items-center gap-2"
                  className=""
                  name={`isActive`}
                  id={`isActive`}
                  options={[{ label: capitalize(item.metroAreaName) }]}
                  register={register}
                  rules={{}}
                  errors={errors}
                />
                <div className="my-2 px-2 d-block d-sm-none">
                  <UncontrolledDropdown
                    setActiveFromChild
                    className="user-dropdown border-0">
                    <DropdownToggle
                      tag="a"
                      className="timeCard-clinician pointer">
                      <a>
                        <Button
                          id={item.metroAreaName}
                          className="table-dot"
                          type="button">
                          <Options />
                        </Button>
                      </a>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <span
                          onClick={() => {
                            setDeleteLocationModal(!deleteLocationModal);
                            setSelectedItemForDelete(item.id);
                          }}>
                          Delete Area
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </Col>
            <Col>
              {index === 0 && <p className="text-wrap">Median Hourly Rate</p>}
              <FormSelect
                options={HourlyConstants}
                placeholder="Select"
                control={control}
                name={'rate'}
                id={`rate`}
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={HourlyRateRules}
                divClassName={'form-group'}
                onChangeCallback={() => {
                  trigger();
                  handleChange({
                    id: item.id,
                    metroAreaName: item.metroAreaName,
                    ...getValues(),
                  });
                }}
              />
            </Col>
            <Col>
              {index === 0 && (
                <p
                  className="text-wrap"
                  style={{ padding: '0px 25%' }}>
                  Fill Rate
                </p>
              )}
              <FormSelect
                options={PercentageContstants}
                placeholder="Select"
                control={control}
                name={`fillPercentage`}
                id={`fillPercentage`}
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={fillPercentageRules}
                divClassName={'form-group'}
                onChangeCallback={() => {
                  trigger();
                  handleChange({
                    id: item.id,
                    metroAreaName: item.metroAreaName,
                    ...getValues(),
                  });
                }}
              />
            </Col>
            <Col>
              {index === 0 && (
                <p
                  className="text-wrap"
                  style={{ padding: '0px 25%' }}>
                  Radius
                </p>
              )}
              <FormSelect
                options={RadiusConstants}
                placeholder="Select"
                control={control}
                name={`radius`}
                id={`radius`}
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={radiusRules}
                divClassName={'form-group'}
                onChangeCallback={() => {
                  trigger();
                  handleChange({
                    id: item.id,
                    metroAreaName: item.metroAreaName,
                    ...getValues(),
                  });
                }}
              />
            </Col>
            <Col>
              {index === 0 && (
                <p
                  className="text-wrap"
                  style={{ padding: '0px 25%' }}>
                  Zipcode
                </p>
              )}
              <FormInput
                divClassName={'d-flex flex-column'}
                inputDivClassName="median-rate-form-input"
                name={'zipcode'}
                id={'zipcode'}
                type={'number'}
                label={''}
                register={register}
                rules={ZipCodeRules}
                errors={errors}
              />
            </Col>
            <Col>
              {index === 0 && (
                <p
                  className="text-wrap"
                  style={{ padding: '0px 5%' }}>
                  Clinician Type
                </p>
              )}
              <div className="d-flex align-items-end">
                <FormSelect
                  divClassName={'w-100'}
                  name={'clinicianType'}
                  id={'clinicianType'}
                  rules={ClinicianTypeRules}
                  options={clinician}
                  errors={errors}
                  placeholder="Select"
                  control={control}
                  optionValue="value"
                  optionLabel="label"
                  trigger={trigger}
                  onChangeCallback={() => {
                    trigger();
                    handleChange({
                      id: item.id,
                      metroAreaName: item.metroAreaName,
                      ...getValues(),
                    });
                  }}
                />
                <div className="my-2 px-2  d-none d-sm-block">
                  <UncontrolledDropdown
                    setActiveFromChild
                    className="user-dropdown border-0">
                    <DropdownToggle
                      tag="a"
                      className="timeCard-clinician pointer">
                      <a>
                        <Button
                          id={item.metroAreaName}
                          className="table-dot"
                          type="button">
                          <Options />
                        </Button>
                      </a>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <span
                          onClick={() => {
                            setDeleteLocationModal(!deleteLocationModal);
                            setSelectedItemForDelete(item.id);
                          }}>
                          Delete Area
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default MedianRateForm;
