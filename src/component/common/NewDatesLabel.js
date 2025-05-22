import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { random, sort } from "radash";
import Delayed from "utils/Delayed";
import {
  DEFAULT_DATE_FORMAT,
  DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  timeZone,
} from "utils/Utils";
import { DEFAULT_TIMEZONE, uuid } from "constants/AppConstants";
import DatesToolTip from "./DatesTooltip";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
dayjs.extend(utc);
export default function NewDatesLabel({ arr, serverDate, timeZone, className, br }) {
  timeZone = timeZone ? timeZone : DEFAULT_TIMEZONE;
  let clonedArr = [];
  const [isHover, setIsHover] = useState(false);
  const dateRef = useRef();
  if (arr) {
    clonedArr = JSON.parse(JSON.stringify(arr));
  }
  const [uid, setUid] = useState("id");
  clonedArr = sort(clonedArr, (f) => f.sortOrder);
  let tempArr = [];
  for (let i = 0; i < clonedArr.length; i++) {
    clonedArr[i].mode = "normal";
    if (i === 0) tempArr.push(clonedArr[i]);
    else {
      let prevEndDate = dayjs(
        serverDate ? clonedArr[i].endDate * 1000 : clonedArr[i].endDate
      ).subtract(1, "day");
      let lastIndexData = { ...tempArr[tempArr.length - 1] };
      let lastIndexEndDate = dayjs(
        serverDate ? lastIndexData.endDate * 1000 : lastIndexData.endDate
      );
      let lastClonedIndexData = { ...clonedArr[i - 1] };
      let lastStartDate = dayjs(
        serverDate
          ? lastClonedIndexData.startDate * 1000
          : lastClonedIndexData.startDate
      );
      let curClonedIndexData = { ...clonedArr[i] };
      let curStartDate = dayjs(
        serverDate
          ? curClonedIndexData.startDate * 1000
          : curClonedIndexData.startDate
      ).subtract(1, "day");
      if (
        // lastStartDate.isSame(curStartDate) &&
        // prevEndDate.isSame(lastIndexEndDate)
        false
      ) {
        tempArr[tempArr.length - 1].mode = "merged";
        tempArr[tempArr.length - 1].endDate = serverDate
          ? prevEndDate.add(1, "day").unix()
          : prevEndDate.add(1, "day").toDate();
      } else tempArr.push(clonedArr[i]);
    }
  }
  useEffect(() => setUid(`id-${random(1, 1000)}`), [arr]);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      <div
        id={uid}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dateRef}
      >
        {tempArr.map((date, index) => {
          // if (index > 2) return <></>;
          return (
            <React.Fragment key={uuid()}>
              {date.mode === "merged" ? (
                <div className={className} id={"id" + date.id} key={index}>
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format("MMM DD")}
                  {" - "}
                  {dayjs(serverDate ? date.endDate * 1000 : date.endDate)
                    ?.tz(timeZone)
                    .format("DD, YYYY")}{" "}
                  {br && <br />}
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format(
                      DEFAULT_TIME_FORMAT(
                        serverDate ? date.startDate * 1000 : date.startDate
                      )
                    )}
                  {" - "}
                  {dayjs(serverDate ? date.endDate * 1000 : date.endDate)
                    ?.tz(timeZone)
                    .format(
                      DEFAULT_TIME_FORMAT(
                        serverDate ? date.endDate * 1000 : date.endDate
                      )
                    )}{" "}
                  {index === 2 && tempArr.length > 3 && " ..."}
                </div>
              ) : (
                <div className={className} id={"id" + date.id} key={index}>
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format(DEFAULT_DATE_FORMAT)}{" "}
                  {br && <br />}
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format(
                      DEFAULT_TIME_FORMAT(
                        serverDate ? date.startDate * 1000 : date.startDate
                      )
                    )}
                  -
                  {dayjs(serverDate ? date.endDate * 1000 : date.endDate)
                    ?.tz(timeZone)
                    .format(
                      DEFAULT_TIME_FORMAT(
                        serverDate ? date.endDate * 1000 : date.endDate
                      )
                    )}
                  {/* {index === 2 && arr.length > 3 && " ..."} */}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {isHover && document.getElementById(uid) ? (
        <>
          {clonedArr && clonedArr?.length > 0 ? (
            <DatesToolTip
              id={uid}
              arr={clonedArr}
              serverDate={serverDate}
              timeZone={timeZone}
              targetRef={dateRef?.current}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}