import dayjs from "dayjs";
import { useEffect, useState, Fragment } from "react";
import { random, sort } from "radash";
import {
  DEFAULT_TIME_FORMAT,
} from "utils/Utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DEFAULT_TIMEZONE, uuid } from "constants/AppConstants";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function TimeLabel({ arr, serverDate, timeZone, className, br }) {
  timeZone = timeZone ? timeZone : DEFAULT_TIMEZONE;
  useEffect(() => setUid(`id-${random(1, 1000)}`), [arr]);

  let clonedArr = [];
  if (arr) {
    clonedArr = JSON.parse(JSON.stringify(arr));
  }

  const [uid, setUid] = useState("id");
  clonedArr = sort(clonedArr, (f) => f.sortOrder);

  let tempArr = [];

  for (let i = 0; i < clonedArr.length; i++) {
    clonedArr[i].mode = "normal";
    if (i === 0) tempArr.push(clonedArr[i]);

  return (
    <>
      <div style={{color: '#01a796'}}
        id={uid}
      >
        {tempArr.map((date, index) => {
          if (index > 1) return <></>;
          return (
            <Fragment key={uuid()}>
              {date.mode === "merged" ? (
                <div className={className} id={"id" + date.id} key={index}>
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
                  {index === 1 && arr.length > 2 && " ..."}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
}