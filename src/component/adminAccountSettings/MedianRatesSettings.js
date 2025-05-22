import React, { useEffect, useState } from 'react';
import {
  DELETE_MEDIAN_RATES,
  MEDIAN_RATES,
  UPDATE_MEDIAN_RATES,
} from 'constants/ApiUrls';
import { api } from 'api/Api';
import { MEDIAN_RATE_UPDATED, RESPONSE_OK } from 'constants/AppConstants';
import FormButton from 'component/common/FormButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewLocationModal from 'component/modals/AddNewLocationModal';
import DeleteLocationModal from 'component/modals/DeleteLocationModal';
import MedianRateForm from './MedianRateForm';
import { toast } from 'react-toastify';
import AddNewBroadcastModal from 'component/AddBroadcastToClinician';

let changesInItems = [];
function MedianRates() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [addNewBroadcastModal, setAddNewBroadcastModal] = useState(false);
  const [addNewLocationModal, setAddNewLocationModal] = useState(false);
  const [deleteLocationModal, setDeleteLocationModal] = useState(false);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState();
  const [filters, setFilters] = useState({
    direction: 'aToZ',
  });

  const handleChange = (changeDetails) => {
    const findIdx = changesInItems.findIndex(
      (ma) => ma.id === changeDetails.id,
    );
    if (findIdx === -1) {
      changesInItems.push(changeDetails);
      return;
    }
    changesInItems[findIdx] = changeDetails;
  };

  const handleUpdate = async () => {
    const promises = changesInItems.map((metroArea) => {
      const reqData = {
        metroAreaName: metroArea?.metroAreaName,
        rate: Number(metroArea?.rate) || 0,
        isActive: metroArea.isActive,
        fillPercentage: Number(metroArea?.fillPercentage),
        radius: Number(metroArea.radius),
        clinicianType: metroArea.clinicianType,
        zipcode: Number(metroArea.zipcode),
      };
      return api(UPDATE_MEDIAN_RATES, reqData, metroArea.id);
    });

    if (promises.length) {
      await Promise.allSettled(promises);
      toast?.success(MEDIAN_RATE_UPDATED);
      changesInItems = [];
      getList();
    }
  };

  const handleDelete = () => {
    if (selectedItemForDelete) {
      api(DELETE_MEDIAN_RATES, {}, selectedItemForDelete).then((res) => {
        if (res.status === RESPONSE_OK) {
          getList();
        }
      });
    }
  };

  const getList = async () => {
    setIsLoading(true);
    await api(MEDIAN_RATES, {}, null, filters).then((res) => {
      if (res.status === RESPONSE_OK) {
        setList(res?.data?.data);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    getList();
  }, [filters]);

  return (
    <>
      <div className="container mt-5">
      <div style={{paddingBottom:'10px'}}>
      <h5 style={{paddingBottom:'8px'}} className="pb:'20px'">Send Notification To Clinician</h5>
      <div className="">
              <FormButton
                type="submit"
                className="btn-link add-btn"
                label={'send Notification'}
                onClick={() => setAddNewBroadcastModal(!addNewBroadcastModal)}
              />
            </div>
      </div>

        <h5 className="">Select the Median Hourly Rates</h5>
        {list.length === 0 && isLoading === false && (
          <p className="text-center my-5">
            There is no median rate data found. Please add some.
          </p>
        )}

        <div className="my-4">
          {list.length >= 1 &&
            list.map((item, index) => (
              <MedianRateForm
                key={item.id}
                item={item}
                deleteLocationModal={deleteLocationModal}
                setDeleteLocationModal={setDeleteLocationModal}
                setSelectedItemForDelete={setSelectedItemForDelete}
                handleChange={handleChange}
                index={index}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
        </div>

        <div className="d-flex align-items-center justify-content-center mt-2 position-relative">
          <div className="text-left position-absolute start-0 my-2 w-25">
            <button
              label={'Add New Location'}
              type="button"
              className="btn-link add-btn"
              onClick={() => setAddNewLocationModal(!addNewLocationModal)}>
              + Add location
            </button>
          </div>
          {list.length > 0 && (
            <div className="d-flex justify-content-center">
              <FormButton
                type="submit"
                label={'Save'}
                onClick={handleUpdate}
                className="pt-btn btn-primary pt-btn-small"
              />
            </div>
          )}
        </div>
       
      </div>
      <AddNewLocationModal
        modal={addNewLocationModal}
        toggle={() => setAddNewLocationModal(!addNewLocationModal)}
        list={list}
        callbackFn={() => {
          setAddNewLocationModal(!addNewLocationModal);
          getList();
        }}
      />
       <AddNewBroadcastModal
            modal={addNewBroadcastModal}
            toggle={() => setAddNewBroadcastModal(!addNewBroadcastModal)}
            list={list}
            callbackFn={() => {
              setAddNewBroadcastModal(!addNewBroadcastModal);
              getList();
            }}
            />
      <DeleteLocationModal
        modal={deleteLocationModal}
        toggle={() => setDeleteLocationModal(!deleteLocationModal)}
        list={list}
        callbackFn={() => {
          setDeleteLocationModal(!deleteLocationModal);
          handleDelete();
        }}
      />
    </>
  );
}

export default MedianRates;
