import dayjs from "dayjs";
import { UncontrolledTooltip } from "reactstrap";
import {
  DATE_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "utils/Utils";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { DEFAULT_TIMEZONE } from "constants/AppConstants";
dayjs.extend(tz);
dayjs.extend(utc);

export default function DatesToolTip({
  arr,
  id,
  serverDate,
  timeZone,
  placement,
  targetRef,
}) {
  timeZone = timeZone ? timeZone : DEFAULT_TIMEZONE;
  return (
    <UncontrolledTooltip
      className="mw-200"
      placement={placement || "bottom"}
      target={targetRef || id}
    >
      {arr.map((date, index) => {
        return (
          <p className="mb-0" key={index}>
            {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
              ?.tz(timeZone)
              .format('dddd')}{" "}
              {<br />}
            {dayjs(serverDate ? date.startDate * 1000 : date.startDate)
              ?.tz(timeZone)
              .format(DATE_FORMAT)}{" "}
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
          </p>
        );
      })}
    </UncontrolledTooltip>
  );
}
