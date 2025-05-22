import { useState } from 'react';
import { HonestWeekPicker } from './HonestWeekPicker';
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search-icon.svg';
import { Input } from 'reactstrap';
import { SPACE_KEY } from 'constants/AppConstants';
import Select from 'react-dropdown-select';
import { paymentStatus } from 'views/authentication/signUpClinician/HourlyConstant';
import { debounce } from 'utils/Utils';

export default function FilterSection({ filters, setFilters }) {
  // const [date, setDate] = useState();
  const [search, setSearch] = useState('');

  // const convertDate = (date) => {
  //   let dt = new Date(date);
  //   return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}`;
  // };

  const onChange = (week) => {
    setFilters((prev) => ({ ...prev, ...week }));
  };

  // search debouncing
  const searchQuery = debounce(
    (ev) => setFilters((prev) => ({ ...prev, search: ev.target.value })),
    300,
  );

  return (
    <div className="facility-payment-detail ">
      <div className="d-flex justify-content-between">
        <div className="header">
          <div className="userfilter">
            <label htmlFor="filter">Select Week</label>
            <div className="daterange-input d-flex gap-2">
              <HonestWeekPicker onChange={onChange} />
            </div>
          </div>
          <div className="user-sorting usertype">
            <label htmlFor="search">Search</label>
            <div className="search">
              <SearchIcon />
              <Input
                id="search"
                type="text"
                placeholder={'Search by name, email, zipcode'}
                style={{ width: '250px' }}
                onChange={searchQuery}
                onKeyDown={(e) => {
                  if (e.code === SPACE_KEY) {
                    e?.preventDefault();
                  }
                }}
                onWheel={(e) => e?.target?.blur()}
              />
            </div>
          </div>
          {filters.tabName === 'approved' && (
            <div className="user-sorting usertype">
              <label htmlFor="type">Status</label>
              <div className="sort">
                <Select
                  placeholder={'All'}
                  onChange={(val) => {
                    // setFilters({
                    //   ...filters,
                    //   skip: 0,
                    //   limit: APP_LIMIT,
                    //   status: val && val.length ? val[0].value : '',
                    // });
                  }}
                  options={paymentStatus}
                  id="type"
                />
              </div>
            </div>
          )}
        </div>

        {/* <DataTable
          columns={columns}
          data={list}
          progressPending={loader}
          progressComponent={
            <div className="h100px">
              <Spinner color="primary" />
            </div>
          }
          sortIcon={<SortIcon />}
        />
        <CustomPagination
          count={count}
          filters={filters}
          setFilters={setFilters}
        /> */}
      </div>
    </div>
  );
}
