import { createContext } from "react";

import { ConfirmationContextProps } from "@/types";

export const ConfirmationProviderContext = createContext<
  ConfirmationContextProps | undefined
>(undefined);
