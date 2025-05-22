import React, { useContext, useEffect, useState } from "react";
import { Spinner, UncontrolledTooltip } from "reactstrap";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import FormButton from "component/common/FormButton";
import AddSubUserModal from "./Modals/AddSubUserModal";
import { api } from "api/Api";
import { GET_SUB_USERS } from "constants/ApiUrls";
import {
  CLICK_COPY,
  CURSORPOINTER,
  EMAIL_COPIED_TO_CLIPBOARD,
  LOGIN_STATUS_LABELS,
} from "constants/AppConstants";
import { Link } from "react-router-dom";
import UpdateSubUserStatusModal from "./Modals/UpdateSubUserStatusModal";
import { toast } from "react-toastify";
import UserContext from "utils/context/UserContext";

function FacilityLoginInformation({ facilityUser }) {
  const [subUserList, setSubUserList] = useState([]);
  const [getSubUserLoader, setGetSubUserLoader] = useState(false);
  const [addSubUserModal, setAddSubUserModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [updateStatusModal, setUpdateStatusModal] = useState(false);

  const { reset } = useForm();
  const  subadmin  = useContext(UserContext);
  const isSubadmin = subadmin?.user?.roles === 'subadmin';
  useEffect(() => {
    if (facilityUser?.userId?.id) {
      getSubUsers();
    }
  }, [facilityUser]);

  const getSubUsers = () => {
    setGetSubUserLoader(true);
    api(GET_SUB_USERS, {}, null, { userId: facilityUser?.userId.id })
      .then((res) => {
        setSubUserList(res?.data?.data);
      })
      .finally(() => {
        setGetSubUserLoader(false);
      });
  };

  const columns = [
    {
      name: "Sr No.",
      width: "70px",
      selector: (row, index) => <>{index + 1}</>,
    },
    {
      name: "Email",
      width: "900px",
      selector: (row, index) => (
        <>
          <p
            className="email"
            onClick={() => {
              navigator.clipboard.writeText(row.email);
              toast?.success(EMAIL_COPIED_TO_CLIPBOARD);
            }}
            style={CURSORPOINTER}
            id={"email-" + row.id}>
            {row.email}
          </p>
          <UncontrolledTooltip
            placement="right"
            target={"email-" + row.id}>
            {CLICK_COPY}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "Status",
      width: "120px",
      selector: (row, index) => (
        <div
          className={
            row.status === "deactivate" ? "text-danger" : "text-primary"
          }>
          {LOGIN_STATUS_LABELS.get(row.status)}
        </div>
      ),
    },
    {
      name: "",
      width: "120px",
      selector: (row, index) => (
        <div className="text-primary min-100">
         <Link
            onClick={() => {
              setSelectedRow(row);
              setUpdateStatusModal(true);
            }}>
            {row.status !== "deactivate" ? "Deactivate" : "Activate"}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="general-content login-content facility-payment-detail">
        <div className="first-block">
          <div className="picture-block border-0 ms-0 p-0">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Sub Users</h5>
             {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Add Sub User"}
                onClick={() => setAddSubUserModal(true)}
              />)} 
            </div>
            <DataTable
              columns={columns}
              data={subUserList}
              progressPending={getSubUserLoader}
              progressComponent={
                <div className="h100px">
                  <Spinner color="primary" />
                </div>
              }
              noDataComponent={
                <p className="fs-6">There is no sub user to display.</p>
              }
            />
            <AddSubUserModal
              facilityUser={facilityUser}
              modal={addSubUserModal}
              toggle={() => {
                setAddSubUserModal(false);
              }}
              callbackFn={getSubUsers}
            />
            <UpdateSubUserStatusModal
              modal={updateStatusModal}
              toggle={() => setUpdateStatusModal(false)}
              data={selectedRow}
              isSubadmin={isSubadmin}
              getData={getSubUsers}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FacilityLoginInformation;
