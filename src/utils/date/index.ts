import { DateRange } from "react-day-picker";

import m from "moment";

import {
  DATE_TIME_FORMAT,
  STATS_PERIOD_PATTERN,
  STATS_PERIOD_REGEX,
  SUPPORTED_RELATIVE_PERIOD_UNITS,
} from "../../components/constants/index";
import {
  PeriodUnit,
  RangeOptions,
  RelativePeriodUnit,
  RelativeUnitsMapping,
  ValueItemProps,
} from "@/types";
import moment from "moment";

export function formatDate(date?: string | number | Date, fmt?: string) {
  if (!fmt) return m(date || new Date()).format("LLLL");
  return m(date).format(fmt);
}

export function formatDates(
  date?: Date | RangeOptions,
  fmt?: string,
  defaultPlaceholder = "Pick a date",
) {
  if (!date) return defaultPlaceholder;

  if (date instanceof Date) return formatDate(date as Date, fmt);

  const { range, statsPeriod } = date as RangeOptions;

  if (statsPeriod) return statsPeriod;

  return range?.from
    ? range.to
      ? `${formatDate(range?.from, fmt)} - ${formatDate(range?.to, fmt)}`
      : `${formatDate(range?.from, fmt)}`
    : defaultPlaceholder;
}

/**
 * Gets time (hours + minutes) of the current date object
 *
 * @param date Date
 */
export function getTimeStringFromDate(date: Date) {
  return m(date).local().format("HH:mm");
}

/**
 * Sets time (hours + minutes) of the current date object
 *
 * @param timeStr Time in 24hr format (HH:mm)
 */
export function setDateToTime(
  timeStr: string,
  dateObj?: string | Date,
  { local }: { local?: boolean } = {},
): Date {
  const [hours, minutes, seconds] = timeStr
    .split(":")
    .map((t) => parseInt(t, 10));

  const date = new Date(dateObj ?? new Date());

  if (local) {
    date.setHours(hours, minutes);
  } else {
    date.setUTCHours(hours, minutes);
  }

  if (typeof seconds !== "undefined") {
    date.setSeconds(seconds);
  }

  return date;
}

export function getFormattedAbsoluteUnit(
  singleFmt: string,
  pluralFmt: string,
  num: number,
): string {
  let value = Math.abs(num) || 0;

  if (value <= 1) return singleFmt;

  return pluralFmt.replace("%s", value + "");
}

function timePeriodIsWithinLimit<T extends RelativeUnitsMapping>({
  amount,
  unit,
  maxDays,
  supportedPeriods,
}: {
  amount: number;
  supportedPeriods: T;
  unit: keyof T & string;
  maxDays?: number;
}) {
  if (!maxDays) return true;

  const daysMultiplier = supportedPeriods[unit].convertToDaysMultiplier;
  const numberOfDays = amount * daysMultiplier;

  return numberOfDays <= maxDays;
}

/**
 * A custom autocomplete implementation for <TimeRangeSelector />
 * This function generates relative time ranges based on the user's input (not limited to those present in the initial set).
 *
 * When the user begins their input with a number, we provide all unit options for them to choose from:
 * "5" => ["Last 5 seconds", "Last 5 minutes", "Last 5 hours", "Last 5 days", "Last 5 weeks"]
 *
 * When the user adds text after the number, we filter those options to the matching unit:
 * "5d" => ["Last 5 days"]
 * "5 days" => ["Last 5 days"]
 *
 * If the input does not begin with a number, we do a simple filter of the preset options.
 */
export const timeRangeAutoCompleteFilter = function <
  T extends RelativeUnitsMapping,
>(
  filterValue: string,
  {
    supportedPeriods,
    supportedUnits,
    maxDays,
    maxDateRange,
  }: {
    supportedPeriods: T;
    supportedUnits: Array<keyof T & string>;
    maxDateRange?: number;
    maxDays?: number;
  },
): ValueItemProps[] {
  const match = filterValue.match(/(?<digits>\d+)\s*(?<string>\w*)/);

  const userSuppliedAmount = Number(match?.groups?.digits);
  const userSuppliedUnits = (match?.groups?.string ?? "").trim().toLowerCase();

  const userSuppliedAmountIsValid =
    !isNaN(userSuppliedAmount) && userSuppliedAmount > 0;

  // If there is a number w/o units, show all unit options within limit
  if (userSuppliedAmountIsValid && !userSuppliedUnits) {
    return supportedUnits
      .filter((unit) =>
        timePeriodIsWithinLimit({
          amount: userSuppliedAmount,
          unit,
          maxDays: maxDateRange ?? maxDays,
          supportedPeriods,
        }),
      )
      .map((unit) => ({
        label: supportedPeriods[unit].label(userSuppliedAmount),
        value: `${userSuppliedAmount}${unit}`,
      }));
  }

  // If there is a number followed by units, show the matching number/unit option
  if (userSuppliedAmountIsValid && userSuppliedUnits) {
    const matchingUnit = supportedUnits.find((unit) => {
      if (userSuppliedUnits.length === 1) {
        return unit === userSuppliedUnits;
      }

      return supportedPeriods[unit].searchKey.startsWith(userSuppliedUnits);
    });

    if (
      matchingUnit &&
      timePeriodIsWithinLimit({
        amount: userSuppliedAmount,
        unit: matchingUnit,
        maxDays,
        supportedPeriods,
      })
    ) {
      return [
        {
          label: supportedPeriods[matchingUnit].label(userSuppliedAmount),
          value: `${userSuppliedAmount}${matchingUnit}`,
        },
      ];
    }
  }

  return [];
};

/**
 * Parses a stats period into `period` and `periodLength`
 */
export function parseStatsPeriodToPeriods(input: string) {
  const result = input.match(STATS_PERIOD_PATTERN);

  if (!result) return undefined;

  const period = result[1];

  // default to seconds.
  const periodLength = (result[2] || "s") as PeriodUnit;

  return { period, periodLength };
}

/**
 * This parses our period shorthand strings (e.g. <int><unit>)
 * and converts it into hours
 */
export function parsePeriodToHours(str: string): number {
  const result = parseStatsPeriodToPeriods(str);

  if (!result) return -1;

  const { period, periodLength } = result;

  const periodNumber = parseInt(period, 10);

  switch (periodLength) {
    case "s":
      return periodNumber / (60 * 60);
    case "m":
      return periodNumber / 60;
    case "h":
      return periodNumber;
    case "d":
      return periodNumber * 24;
    case "w":
      return periodNumber * 24 * 7;
    case "M":
      return periodNumber * 24 * 7 * 30;
    default:
      return -1;
  }
}

export const parseStatsPeriodString = (statsPeriodString: string) => {
  const result = STATS_PERIOD_REGEX.exec(statsPeriodString);

  if (result === null) {
    throw new Error("Invalid stats period");
  }

  const value = parseInt(result[1], 10);
  const unit = result[2] as RelativePeriodUnit;

  return {
    value,
    unit,
  };
};

/**
 * Converts a relative stats period, e.g. `1h` to an object containing a start
 * and end date, with the end date as the current time and the start date as the
 * time that is the current time less the statsPeriod.
 *
 * @param statsPeriod Relative stats period
 * @param outputFormat Format of outputted start/end date
 * @return Object containing start and end date as YYYY-MM-DDTHH:mm:ss
 *
 */
export function parseStatsPeriod(
  statsPeriod: string,
  outputFormat: string | null = DATE_TIME_FORMAT,
): { end: Date; start: Date } {
  const { value, unit } = parseStatsPeriodString(statsPeriod);

  const momentUnit = SUPPORTED_RELATIVE_PERIOD_UNITS[unit].momentUnit;

  // FIXME: this is not using the format at the moment
  // come and check and on it later
  // @ts-ignore
  const _format = outputFormat ?? undefined;

  return {
    start: moment().subtract(value, momentUnit).toDate(),
    end: moment().toDate(),
  };
}

// this function is suppose to handle the parsing of the range stat period selection
export function handleParseStatsPeriod(
  statsPeriod: string,
  mode: "single" | "range",
  setDate: (d: DateRange) => void,
) {
  const { start, end } = parseStatsPeriod(statsPeriod);

  if (mode === "range") {
    setDate({
      from: start,
      to: end,
    });
  }
}
