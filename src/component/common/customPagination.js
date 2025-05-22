import React from "react";
import { PaginationLeft, PaginationRight } from "../../assets/svg";

const CustomPagination = ({ count = 0, filters = {}, setFilters, type }) => {
  const tableOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 500, value: 500 },
  ];

  const cardOptions = [
    { label: 6, value: 6 },
    { label: 12, value: 12 },
    { label: 18, value: 18 },
    { label: 24, value: 24 },
    { label: 30, value: 30 },
  ];
  const reviewOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
    { label: 25, value: 25 },
    { label: 30, value: 30 },
  ];

  const options =
    type === "card"
      ? cardOptions
      : type === "review"
      ? reviewOptions
      : tableOptions;
  return (
    <>
      {count === 0 ? (
        <></>
      ) : (
        // filters?.limit && filters?.skip === 0 && count <= filters?.limit ? (
        //   <div className="pagination-main">
        //     <div className="page-count">
        //       <span>Items per page:</span>
        //       <select
        //         value={filters.limit}
        //         onChange={(ev) =>
        //           setFilters({ ...filters, limit: ev.target.value, skip: 0 })
        //         }
        //       >
        //         {options.map((option) => {
        //           return (
        //             <option key={option.value} value={option.value}>
        //               {option.label}
        //             </option>
        //           );
        //         })}
        //       </select>
        //     </div>
        //   </div>
        // )
        // :
        <div className="pagination-main">
          <div className="page-count">
            <span>Items per page:</span>
            <select
              value={filters.limit}
              onChange={(ev) =>
                setFilters({ ...filters, limit: ev.target.value, skip: 0 })
              }
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="total-items">
            Page {filters.skip / filters.limit + 1} of{" "}
            {Math.ceil(count / filters.limit)}
          </div>
          <div className="page-action-btn">
            <button
              disabled={filters.skip <= 0}
              onClick={() =>
                setFilters({
                  ...filters,
                  skip: parseInt(filters.skip) - parseInt(filters.limit),
                })
              }
            >
              <PaginationLeft />
            </button>
            <button
              disabled={
                filters.skip > count - filters.limit ||
                filters.skip / filters.limit + 1 ===
                  Math.ceil(count / filters.limit)
              }
              onClick={() =>
                setFilters({
                  ...filters,
                  skip: parseInt(filters.skip) + parseInt(filters.limit),
                })
              }
            >
              <PaginationRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPagination;