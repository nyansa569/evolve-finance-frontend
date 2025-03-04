import { DateRange } from "react-day-picker";

import moment from "moment";

export type DateModeTypes = "single" | "range";
export type PeriodUnit = "s" | "m" | "h" | "d" | "w" | "M";
export type RelativePeriodUnit = Exclude<PeriodUnit, "s">;
export type RangeOptions = Partial<{
  range: DateRange;
  statsPeriod: string;
}>;
export type DateParamsTypes = Partial<{
  start: Date;
  end: Date;
  statsPeriod: string;
}>;
[];
export type RelativeUnitsMapping = {
  [Unit: string]: {
    convertToDaysMultiplier: number;
    label: (num: number) => string;
    momentUnit: moment.unitOfTime.DurationConstructor;
    searchKey: string;
  };
};
