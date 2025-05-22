import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import FormInput from "component/common/FormInput";
import UploadFile from "component/common/uploadFile";
import { UPDATE_ADMIN_PROFILE_URL, UPDATE_CLINICIAN_CSV_FILE, DELETE_FILE_URL } from "constants/ApiUrls";
import { ACCEPT_CSV, ACCEPT_IMAGE, RESPONSE_CREATED, RESPONSE_OK } from "constants/AppConstants";
import { FirstNameRules, LastNameRules } from "constants/Rules";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Col, Row, Form } from "reactstrap";
import UserContext from "utils/context/UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import csvFile from "../../assets/Example_clinician_agreement.csv";
function GeneralInformation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [otherFormData, setOtherFormData] = useState({});
  const { user, setUser } = useContext(UserContext);
  const role = localStorage.getItem("userRole");
  const [value, setValue] = useState("");
  const [removeCsvFlag, setRemoveCsvFlag] = useState(false);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const handleFileRemove = (fileUrl) => {
    setFilesToRemove((prevFiles) => [...prevFiles, fileUrl]);
  };
  useEffect(() => {
    reset({ ...user });
    setValue(user?.termAndConditions);
    setOtherFormData({
      profileImageUrl: user.profileImageUrl || "",
    });
  }, [user]);
  const quillModules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ align: [] }],
      [
        {
          color: [
            "#382768",
            "#01A796",
            "#32325D",
            "#CACACA",
            "#80798B",
            "#000",
            "#FFF",
            "#E20303",
            "#FF9F43",
            "#01AED4",
          ],
        },
      ],
      ["clean"], // remove formatting button
    ],
  };
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const res = await api(UPDATE_ADMIN_PROFILE_URL, {
        ...data,
        userId: data.id,
        termAndConditions: value,
        ...otherFormData,
      });
      if (res.status === RESPONSE_OK) {
        setLoader(false);
        setUser({ ...res.data.data });
      // Call remove-file API for all files in filesToRemove state after successful save
      filesToRemove.forEach((fileUrl) => {
        api(DELETE_FILE_URL, { url: [fileUrl] }).then((res) => {
          if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
            console.log(`File ${fileUrl} removed successfully`);
          } else {
            console.error(`Error removing file ${fileUrl}`);
          }
        });
      });
      setFilesToRemove([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const fileUrl = otherFormData.csvFile;
      api(UPDATE_CLINICIAN_CSV_FILE, { fileUrl: fileUrl }).then((res) => {
        if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
          setLoader(false);
          setRemoveCsvFlag(true);
        } else {
          setLoader(false);
        }
      })
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fileCallbackFn = (res, id, multiple) => {
    setOtherFormData({
      ...otherFormData,
      [id]: multiple ? [...otherFormData[id], ...res] : res[0],
    });
  };
  const storeFile = (resData, id, multiple) => {
    const uploadedFileUrl = resData[0];
    setOtherFormData({
      ...otherFormData,
      csvFile: uploadedFileUrl,
    });
  };
  return (
    <>
      <div className="general-content">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="first-block">
            <div className="general-photo-main m-0 p-0 border-0">
              <div className="picture-block m-0 p-0 border-0">
                <h5>Profile picture</h5>
                <p>
                  Select a high quality primary profile image to represent
                  yourself
                </p>
                <div className="uploaded-pic clinician">
                  <UploadFile
                    serverFiles={
                      otherFormData.profileImageUrl
                        ? [otherFormData.profileImageUrl]
                        : []
                    }
                    multiple={false}
                    id="profileImageUrl"
                    accept={ACCEPT_IMAGE}
                    folder="images"
                    max={1}
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={(respData, id) =>
                      setOtherFormData({ ...otherFormData, [id]: respData })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="primary-contact">
            <h5>General information</h5>
            <Row>
              <Col md={6}>
                <FormInput
                  disabled={true}
                  divClassName="form-group pr-12"
                  name={"firstName"}
                  id={"firstName"}
                  type={"text"}
                  label={"First Name :"}
                  register={register}
                  rules={FirstNameRules}
                  errors={errors}
                  autoFocus={true}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  disabled={true}
                  divClassName="form-group pl-12"
                  name={"lastName"}
                  id={"lastName"}
                  type={"text"}
                  label={"Last Name :"}
                  register={register}
                  rules={LastNameRules}
                  errors={errors}
                />
              </Col>
            </Row>
            {/* <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"submit"}
                label={"Save"}
                loader={loader}
              />
            </div> */}
          </div>
         {role !== "subadmin" && (<div>
            <h5>Clinician Agreement Upload</h5>
            <div className="form-group">
              <label htmlFor="State">Upload the CSV file:</label>
              <Row>
                <Col md={6}>
                  <div className="signup-upload-file mb-40" style={{ width: "97%" }}>
                    <UploadFile
                      gridView={true}
                      multiple={false}
                      id="csvFile"
                      name={"csvFile"}
                      accept={ACCEPT_CSV}
                      folder="docs"
                      uploadType="csv"
                      max={1}
                      callbackFn={storeFile}
                      removeCsvFlag={removeCsvFlag}
                      otherFormData={otherFormData}
                      deleteCallbackFn={(respData, id) =>
                        setOtherFormData({ ...otherFormData, [id]: respData })
                      }
                    />
                    <a
                     style={{color: "#01a796", fontWeight: "400", fontSize: "14px", marginTop: "15px !important"}}
                     href= {csvFile} download>
                      Download Sample File
                    </a>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-4">
                <FormButton
                  className="pt-btn btn-primary pt-btn-small"
                  type={"button"}
                  label={"Submit"}
                  onClick={handleUpload}
                  loader={loader}
                />
              </div>
            </div>
          </div>)}
          {role === "admin" ? (
            <div className="primary-contact ">
              <h5>Clinician Agreement</h5>
              <ReactQuill
                value={value}
                onChange={setValue}
                modules={quillModules}
              />
              <div className="text-center mt-4">
                <FormButton
                  className="pt-btn btn-primary pt-btn-small"
                  type={"submit"}
                  label={"Save"}
                  loader={loader}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </>
  );
}
export default GeneralInformation;