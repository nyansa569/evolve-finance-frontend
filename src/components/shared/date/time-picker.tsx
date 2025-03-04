import React from "react";

import { cn } from "@/utils";

import { Input } from "@/components/ui/input";

type Props = {
  mode: "single" | "range";
  onChangeStart: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEnd: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  // Should inputs be disabled
  disabled?: boolean;
  // Takes string in 24 hour format
  end?: string;
  hasEndErrors?: boolean;
  hasStartErrors?: boolean;
  // Takes string in 24 hour format
  start?: string;
};

export default function TimePicker({
  onChangeEnd,
  onChangeStart,
  className,
  disabled,
  end,
  hasEndErrors,
  hasStartErrors,
  start,
  mode,
}: Readonly<Props>) {
  return (
    <>
      <Input
        type="time"
        key={"start" + start}
        defaultValue={start}
        data-test-id="startTime"
        aria-invalid={hasStartErrors}
        disabled={disabled}
        onChange={onChangeStart}
        className={cn(className)}
        containerClassName="p-0"
      />

      {mode === "range" && (
        <Input
          type="time"
          defaultValue={end}
          key={"end" + end}
          data-test-id="endTime"
          disabled={disabled}
          aria-invalid={hasEndErrors}
          onChange={onChangeEnd}
          className={cn(className)}
          containerClassName="p-0"
        />
      )}
    </>
  );
}
