import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GlobalState, UploadProgressState } from "@/types";
import { RootState } from "../store";

const initialState: GlobalState = {
  progress: {
    uploads: [],
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //:: Upload progress reducers
    addFileUploadProgress: (
      state,
      action: PayloadAction<UploadProgressState>,
    ) => {
      const existingUpload = state.progress.uploads.find(
        (upload) =>
          upload.fileName.toLowerCase() ===
          action.payload.fileName.toLowerCase(),
      );

      if (!existingUpload) {
        state.progress.uploads.push(action.payload);
        return;
      }

      state.progress.uploads = state.progress.uploads.map((upload) => {
        if (
          upload.fileName.toLowerCase() ===
          action.payload.fileName.toLowerCase()
        ) {
          return {
            ...upload,
            progress: action.payload.progress,
          };
        }
        return upload;
      });
    },
  },
});

export default globalSlice.reducer;
export const { addFileUploadProgress } = globalSlice.actions;

export const getAllFilesUploadProgress = createSelector(
  (state: RootState) => state.global.progress.uploads,
  (uploads) => uploads,
);
export const getFileUploadProgress = createSelector(
  (state: RootState) => state.global.progress.uploads,
  (_: RootState, fileName: string) => fileName,
  (uploads, fileName: string) => {
    const existingUpload = uploads.find(
      (upload) => upload.fileName.toLowerCase() === fileName.toLowerCase(),
    );

    if (existingUpload) return existingUpload.progress;

    return 0;
  },
);
export const getFileUpload = createSelector(
  (state: RootState) => state.global.progress.uploads,
  (_: RootState, fileName: string) => fileName,
  (uploads, fileName: string) => {
    const existingUpload = uploads.find(
      (upload) => upload.fileName.toLowerCase() === fileName.toLowerCase(),
    );

    return existingUpload;
  },
);
