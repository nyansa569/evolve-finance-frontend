export type AuthUserType = {
  username: string;
  email: string;
};

export interface AuthStoreState {
  user: AuthStoreState | null;
  token: string | null;
  refreshToken: string | null;
}

export type GlobalState = {
  progress: GlobalProgressState;
};

export type GlobalProgressState = {
  uploads: UploadProgressState[];
};

export type UploadProgressState = {
  fileName: string;
  progress: number;
};
