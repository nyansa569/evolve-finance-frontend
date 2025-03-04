import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorProps = { data: { message: string; status: number } };

export function errorHandling(error?: FetchBaseQueryError | SerializedError) {
  const data = (error as ErrorProps)?.data;

  return {
    otp: data?.message?.includes("complete verification"),
    message: data?.message ?? "Something went wrong. Please try again",
    status: data?.status,
  };
}
