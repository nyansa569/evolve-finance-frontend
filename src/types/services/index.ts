export type ApiErrorResponse = {
  description: string;
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
  error?: ApiErrorResponse;
};
