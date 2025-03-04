import React, { ChangeEvent, useCallback, useState } from "react";

import moment from "moment";
import {
  Calendar as CalendarIcon,
  Check,
  TagChevron,
} from "@phosphor-icons/react";

import { ModalProps, RangeOptions } from "@/types";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import TimePicker from "./time-picker";
import { typoVariants } from "../typography";
import { 
  cn, 
  formatDate, 
  formatDates, 
  parseStatsPeriodToPeriods, 
  setDateToTime, 
  timeRangeAutoCompleteFilter 
} from "@/utils";

import { 
  DEFAULT_DATE_PICKERS, 
  DEFAULT_RANGE_STATS_PERIOD, 
  SUPPORTED_RELATIVE_PERIOD_UNITS, 
  SUPPORTED_RELATIVE_UNITS_LIST, 
  TIME_FORMAT 
} from "@/constants";

interface DateProps extends ModalProps {
  showPresets?: boolean;
  showCalendar?: boolean;
  showTimePicker?: boolean;
}
type SingleDateProps = {
  defaultDate?: Date;
  mode: "single";
  setDate: (d?: Date) => void;
};
type RangeDateProps = {
  defaultDate?: RangeOptions;
  mode: "range";
  setDate: (changes: RangeOptions) => void;
};
type Props = DateProps & (SingleDateProps | RangeDateProps);

/**
 * @name DatePicker 
 * @description This is a date and time picker as well as a date time range picker.
 * 
 * @param { Date } defaultDate The default date that will be used or selected by default
 * @param { "single" | "range" } mode This describes the type of calendar selection
 * @param { boolean } showPresets This describes whether the presets default selections show be shown
 * @param { boolean } showCalendar This describes whether the calendar should be shown by default
 * @param { boolean } showTimePicker This describes whether the time picker should be shown 
 * 
 * @function setDate This is the function that is used to change the date when confirmed
 *
 * @returns {JSX.Element}
 * @example //Single Mode
 *          <DatePicker
              key={singleDate?.toString()}
              mode="single"
              open={datePickerShow}
              defaultDate={singleDate}
              setDate={setSingleDate}
              setOpen={(v) => setDatePickerShow(v)}
            />
  @example //Range Mode
            <DatePicker
              key={range.range?.from?.toString()}
              mode={mode}
              defaultDate={range}
              open={dateRangePickerShow}
              setDate={handleDateChange}
              setOpen={(v) => setDateRangePickerShow(v)}
            />
 */

export default function DatePicker({
  mode,
  defaultDate,

  open = false,
  showPresets = true,
  showCalendar,
  showTimePicker = true,

  setDate,
  setOpen,
}: Readonly<Props>) {
  const [search, setSearch] = useState("");
  const [showAbsoluteCalendar, setShowAbsoluteCalendar] = React.useState(
    showCalendar || !showPresets,
  );
  const [internalDates, setInternalDates] = useState<
    Date | RangeOptions | undefined
  >(defaultDate);

  // this function is what is called when the start time picker changes
  function handleTimeStartChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;

    if (mode === "single") {
      const newDate = setDateToTime(value, internalDates as Date);
      setInternalDates(newDate);
    } else {
      const from = setDateToTime(
        value,
        (internalDates as RangeOptions)?.range?.from,
      );
      const to = setDateToTime(
        value,
        (internalDates as RangeOptions)?.range?.to,
      );
      setInternalDates({ range: { from, to } });
    }
  }

  // this function is what is called when the end time picker changes
  function handleTimeEndChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;

    if (mode === "range") {
      const from = setDateToTime(
        value,
        (internalDates as RangeOptions)?.range?.from,
      );
      const to = setDateToTime(
        value,
        (internalDates as RangeOptions)?.range?.to,
      );
      setInternalDates({ range: { from, to } });
    }
  }

  // this function is what is called when a value is inputted for period range
  const getRangeOptions = useCallback(
    function handlePeriodInputChange() {
      if (!search) return DEFAULT_RANGE_STATS_PERIOD;

      const rangeOptions = timeRangeAutoCompleteFilter(search, {
        supportedPeriods: SUPPORTED_RELATIVE_PERIOD_UNITS,
        supportedUnits: SUPPORTED_RELATIVE_UNITS_LIST,
      });

      return rangeOptions;
    },
    [search],
  );

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen?.(v);

        if (!v && !showCalendar && showPresets) {
          setShowAbsoluteCalendar(v);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="transparent"
          className={cn(
            "gap-x-2 min-w-40 flex items-center justify-between border rounded-md border-neutral-lighter hover:bg-neutral-lighter",
            typoVariants({ typo: "body-small-semibold" }),
            mode === "single" && !defaultDate && "text-muted-foreground",
            mode === "range" &&
              !defaultDate?.range?.from &&
              "text-muted-foreground",
          )}
        >
          {/* FIXME: change to a shorter date format when the viewport is smaller */}
          {formatDates(
            defaultDate,
            mode === "single"
              ? `LL ${showTimePicker ? " | HH:mm A" : ""}`
              : "ll",
            mode === "single" ? "Pick a date" : "Select range",
          )}

          <CalendarIcon className="w-6 h-6" />
        </Button>
      </PopoverTrigger>

      {mode === "single" ? (
        <PopoverContent className="flex w-auto max-w-[16.5rem] flex-col space-y-2 p-2">
          {showPresets && !showAbsoluteCalendar && (
            <Command className="md:min-w-52">
              <CommandList>
                <CommandGroup>
                  {DEFAULT_DATE_PICKERS.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(value) => {
                        setDate(
                          moment(
                            showTimePicker
                              ? new Date()
                              : new Date().setHours(0, 0, 0),
                          )
                            .add(parseInt(value), "days")
                            .toDate(),
                        );

                        setOpen?.(false);
                      }}
                      //FIXME: active or selected classnames
                      className={cn(
                        "cursor-pointer py-2 hover:bg-neutral-lighter",
                      )}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                  <CommandSeparator />
                  <CommandItem
                    className={cn(
                      "cursor-pointer flex justify-between py-2 hover:bg-neutral-lighter",
                    )}
                    onSelect={() => setShowAbsoluteCalendar(true)}
                  >
                    Absolute date
                    <TagChevron className="w-4 h-4" />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          )}

          {showAbsoluteCalendar && (
            <div className="flex flex-col gap-y-2">
              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={internalDates as Date}
                  onSelect={setInternalDates}
                />
              </div>

              <div className="grid grid-cols-2 gap-1 items-center">
                {showTimePicker && (
                  <TimePicker
                    mode={mode}
                    start={formatDate(internalDates as Date, TIME_FORMAT)}
                    onChangeStart={handleTimeStartChange}
                    onChangeEnd={handleTimeEndChange}
                  />
                )}

                <CalendarCallToActions
                  onCancel={() => {
                    setShowAbsoluteCalendar(false);
                  }}
                  onConfirm={() => {
                    if (internalDates) {
                      setDate?.(internalDates as Date);
                    }
                    setOpen?.(false);
                    setShowAbsoluteCalendar(false);
                  }}
                />
              </div>
            </div>
          )}
        </PopoverContent>
      ) : (
        <PopoverContent className="flex w-auto max-w-[16.5rem] flex-col space-y-2 p-2">
          {showPresets && !showAbsoluteCalendar && (
            <Command className="md:min-w-52">
              <CommandInput
                showIcon={false}
                placeholder="Custom range. eg. 2h, 3d, 8w"
                onValueChange={(v) => setSearch(v)}
              />
              <CommandList>
                <CommandEmpty>No options found</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    className={cn(
                      "cursor-pointer py-2 hover:bg-neutral-lighter",
                      !(internalDates as RangeOptions).statsPeriod && "hidden",
                      getRangeOptions().filter(
                        (option) =>
                          option.value !==
                          (internalDates as RangeOptions).statsPeriod,
                      ).length > 0 && "text-primary-300",
                      getRangeOptions().filter(
                        (option) =>
                          option.value ===
                          (internalDates as RangeOptions).statsPeriod,
                      ).length > 0 && "hidden",
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        getRangeOptions().filter(
                          (option) =>
                            option.value !==
                            (internalDates as RangeOptions).statsPeriod,
                        ).length > 0
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {/* FIXME: Refactor this clumpsy logic */}
                    {SUPPORTED_RELATIVE_PERIOD_UNITS[
                      parseStatsPeriodToPeriods(
                        (internalDates as RangeOptions).statsPeriod ?? "",
                      )?.periodLength ?? ""
                    ]?.label(
                      parseInt(
                        parseStatsPeriodToPeriods(
                          (internalDates as RangeOptions).statsPeriod ?? "",
                        )?.period ?? "",
                      ),
                    )}
                  </CommandItem>
                  {getRangeOptions().map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(statsPeriod) => {
                        if (statsPeriod !== "custom") {
                          setDate?.({ statsPeriod });

                          setOpen?.(false);
                          return;
                        }

                        setShowAbsoluteCalendar(true);
                      }}
                      //FIXME: active or selected classnames
                      className={cn(
                        "cursor-pointer py-2 hover:bg-neutral-lighter",
                        (internalDates as RangeOptions).statsPeriod ===
                          option.value && "text-primary-300",
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (internalDates as RangeOptions).statsPeriod ===
                            option.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                  <CommandSeparator />
                  <CommandItem
                    className={cn(
                      "cursor-pointer py-2 hover:bg-neutral-lighter",
                    )}
                    onSelect={() => setShowAbsoluteCalendar(true)}
                  >
                    <Check className={cn("mr-2 h-4 w-4 opacity-0")} />
                    <div className=" flex justify-between flex-1 items-center">
                      Absolute date
                      <TagChevron className="w-4 h-4" />
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          )}

          {showAbsoluteCalendar && (
            <div className="flex flex-col gap-y-2">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={(internalDates as RangeOptions).range?.from}
                selected={(internalDates as RangeOptions).range}
                onSelect={(range, day) => {
                  const currentDates = internalDates as RangeOptions;

                  if (currentDates?.range?.from && currentDates.range.to) {
                    setInternalDates({
                      range: { from: day, to: undefined },
                    });

                    return;
                  }

                  setInternalDates({ range });
                }}
                numberOfMonths={1}
              />

              <div className="grid grid-cols-2 gap-1 items-center">
                {showTimePicker && (
                  <TimePicker
                    mode={mode}
                    start={formatDate(
                      (internalDates as RangeOptions)?.range?.from,
                      TIME_FORMAT,
                    )}
                    end={formatDate(
                      (internalDates as RangeOptions)?.range?.to,
                      TIME_FORMAT,
                    )}
                    onChangeStart={handleTimeStartChange}
                    onChangeEnd={handleTimeEndChange}
                  />
                )}

                <CalendarCallToActions
                  onCancel={() => {
                    setShowAbsoluteCalendar(false);
                  }}
                  onConfirm={() => {
                    if (internalDates) {
                      setDate?.(internalDates as RangeOptions);
                    }
                    setOpen?.(false);
                    setShowAbsoluteCalendar(false);
                  }}
                />
              </div>
            </div>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
}

type CalendarCallToActionsProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
};
function CalendarCallToActions({
  onCancel,
  onConfirm,
}: Readonly<CalendarCallToActionsProps>) {
  return (
    <div className="flex justify-end gap-x-2 items-center col-start-2 col-span-1 h-10">
      <button
        onClick={onCancel}
        className={cn(
          "capitalize rounded-md text-muted-foreground",
          typoVariants({ typo: "body-small-regular" }),
        )}
        type="button"
      >
        back
      </button>
      <button
        onClick={onConfirm}
        className={cn(
          "capitalize bg-primary-300 text-white py-1 px-2 rounded-md",
          typoVariants({ typo: "body-small-regular" }),
        )}
        type="button"
      >
        apply
      </button>
    </div>
  );
}
