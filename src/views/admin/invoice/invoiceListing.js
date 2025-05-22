import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import 'component/userListing/userListing.scss';
import { api } from 'api/Api';
import FilterSection from 'component/invoice/FilterSection';
import InvoiceDataListing from 'component/invoice/InvoiceDataListing';
import { ADMIN_INVOICE_LISTING } from 'constants/ApiUrls';
import { toast } from 'react-toastify';
import { endOfWeek, startOfWeek } from 'date-fns';

function InvoiceListing() {
  const initFilters = {
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }).getTime(),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }).getTime(),
  };
  const [filters, setFilters] = useState({ ...initFilters });
  const [loader, setLoader] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [open, setOpen] = useState("-1"); // accordion open close

  useEffect(() => {
    setOpen("-1");
    getInvoiceData();
  }, [filters]);

  const getInvoiceData = (withLoader = true) => {
    withLoader && setLoader(true); // withLoader is for smooth reloading

    api(ADMIN_INVOICE_LISTING, {}, null, filters)
      .then((res) => {
        setInvoiceData(res.data?.data);
      })
      .catch((err) => {
        console.error('Invoice data fetching error - ', err);
        toast.error('Invoice data fetching error!!');
      })
      .finally(() => {
        withLoader && setLoader(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Purple PRN - Invoice Listing</title>
      </Helmet>
      <div className="account-settings-main user-listing">
        <div className="custom-container">
          <h1>Invoices</h1>
          {/* <Nav tabs>
            {navItems.map((item, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    className={classnames({
                      active: filters.tabName === item.value,
                    })}
                    onClick={() => {
                      setList([]);
                      setCurrentFilterName((prev) => {
                        return {
                          prevTab: prev.currentTab,
                          currentTab: item.value,
                        };
                      });
                      setFilters({
                        ...initFilters,
                        tabName: item.value,
                        search: '',
                        userType: '',
                        status: '',
                      });
                    }}>
                    {item.title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav> */}

          {/* <EmailCapture
              currentFilterName={currentFilterName}
              count={count}
              filters={filters}
              setFilters={setFilters}
              list={list}
              columns={columns}
              loader={loader}
            /> */}

          <FilterSection
            filters={filters}
            setFilters={setFilters}
          />
          <InvoiceDataListing
            filters={filters}
            data={invoiceData}
            loader={loader}
            getInvoiceData={getInvoiceData}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
}

export default InvoiceListing;
