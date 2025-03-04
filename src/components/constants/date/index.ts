import {
  RelativePeriodUnit,
  RelativeUnitsMapping,
  ValueItemProps,
} from "@/types";
import { getFormattedAbsoluteUnit } from "@/utils";

//date constants
export const SUPPORTED_RELATIVE_PERIOD_UNITS: RelativeUnitsMapping = {
  m: {
    label: (num: number) =>
      getFormattedAbsoluteUnit("Last minute", "Last %s minutes", num),
    searchKey: "minutes",
    momentUnit: "minutes",
    convertToDaysMultiplier: 1 / (60 * 24),
  },
  h: {
    label: (num: number) =>
      getFormattedAbsoluteUnit("Last hour", "Last %s hours", num),
    searchKey: "hours",
    momentUnit: "hours",
    convertToDaysMultiplier: 1 / 24,
  },
  d: {
    label: (num: number) =>
      getFormattedAbsoluteUnit("Last day", "Last %s days", num),
    searchKey: "days",
    momentUnit: "days",
    convertToDaysMultiplier: 1,
  },
  w: {
    label: (num: number) =>
      getFormattedAbsoluteUnit("Last week", "Last %s weeks", num),
    searchKey: "weeks",
    momentUnit: "weeks",
    convertToDaysMultiplier: 7,
  },
  M: {
    label: (num: number) =>
      getFormattedAbsoluteUnit("Last month", "Last %s months", num),
    searchKey: "months",
    momentUnit: "months",
    convertToDaysMultiplier: 30,
  },
};

export const SUPPORTED_RELATIVE_UNITS_LIST = Object.keys(
  SUPPORTED_RELATIVE_PERIOD_UNITS,
) as RelativePeriodUnit[];

export const DEFAULT_RANGE_STATS_PERIOD: ValueItemProps[] = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 3 days", value: "3d" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 14 days", value: "14d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

export const DEFAULT_DATE_PICKERS: ValueItemProps[] = [
  { label: "Today", value: "0" },
  { label: "Tomorrow", value: "1" },
  { label: "In 3 days", value: "3" },
  { label: "In a week", value: "7" },
];

export const STATS_PERIOD_PATTERN = "^(\\d+)([hdmswM])?(-\\w+)?$";
export const STATS_PERIOD_REGEX = /^(\d+)([mhdwM])$/;
export const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const TIME_FORMAT = "HH:mm";
