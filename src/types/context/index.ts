import { ConfirmationModalProps } from "@/components/shared/modal/confirmation";

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderProps extends React.PropsWithChildren {
  defaultTheme?: Theme;
  storageKey?: string;
}

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ConfirmationProps = Omit<
  ConfirmationModalProps,
  "setShow" | "show"
>;

export type ConfirmationContextProps = {
  /**
   * Shows a confirmation modal.
   *
   * @param options - Optional props to customize the modal.
   */
  showConfirmation: (options: ConfirmationProps) => void;
};
