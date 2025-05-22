import React, { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { random, sort } from "radash";
import {
  DEFAULT_DATE_FORMAT,
  DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  ADMIN_DATE_FORMAT,
} from "utils/Utils";
import DatesToolTip from "./DatesTooltip";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DEFAULT_TIMEZONE, uuid } from "constants/AppConstants";
import UserContext from "utils/context/UserContext";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function DatesLabel({ arr, serverDate, timeZone,  className, br }) {
  timeZone = timeZone ? timeZone : DEFAULT_TIMEZONE;
  let clonedArr = [];
  const [isHover, setIsHover] = useState(false);
  const { user, setUser } = useContext(UserContext);
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
          if (index > 1) return <React.Fragment key={uuid()}></React.Fragment>;
          return (
            <React.Fragment key={uuid()}>
              {date.mode === "merged" ? (
                <div className={className} id={"id" + date.id} key={index}>
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format("dddd")}
                    {<br />}
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format("M/D")}
                  {" - "}
                  {dayjs(serverDate ? date.endDate * 1000 : date.endDate)
                    ?.tz(timeZone)
                    .format("M/D, YYYY")}{" "}
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
                  {index === 1 && tempArr.length > 2 && " ..."}
                </div>
              ) : (
                <div className={className} id={"id" + date.id} key={index}>
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format("dddd")}
                  {<br />}
                  {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
                    ?.tz(timeZone)
                    .format(user.roles === "admin" ? ADMIN_DATE_FORMAT : DATE_FORMAT)}{" "}
                  {br && <br />}
                  <br />
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
                  {index === 1 && arr.length > 2 && " ..."}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {isHover && document?.getElementById(uid) ? (
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
