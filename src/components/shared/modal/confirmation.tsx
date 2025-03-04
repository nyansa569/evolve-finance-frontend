
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils/helpers";

/**
 * Props for the ConfirmationModal component.
 */
export type ConfirmationModalProps = {
  /**
   * The title of the confirmation modal.
   */
  title?: string;

  /**
   * The description of the confirmation modal.
   */
  description?: string;

  /**
   * The callback function to be called when the confirm button is clicked.
   * Should return a boolean value indicating whether the confirmation was successful.
   *
   * returning `true` automatically closes the dialog
   */
  onConfirm?: () => boolean;

  /**
   * The callback function to be called when the cancel button is clicked.
   */
  onCancel?: () => void;

  /**
   * Determines whether the confirmation modal is shown or hidden.
   */
  show: boolean;

  /**
   * Sets the value of the `show` prop.
   * Accepts a boolean value.
   */
  setShow: (value: boolean) => void;

  /**
   * Determines whether the confirmation modal is in a loading state.
   */
  isLoading?: boolean;

  /**
   * The title of the confirm button.
   */
  btnTitle?: string;

  /**
   * The CSS class name for the confirm button.
   */
  btnClassName?: string;
};

/**
 *  Confirmation dialog
 * @param show - boolean to show or hide the dialog
 * @param setShow - function to set the show state
 * @param title - title of the dialog
 * @param description - description of the dialog
 * @param onConfirm - function to run when the confirm button is clicked
 * @param onCancel - function to run when the cancel button is clicked
 * @param isLoading - boolean to show loading state
 * @param btnTitle - title of the confirm button
 * @param btnClassName - class name of the confirm button
 *
 *
 *  By default, the confirm button is styled with the `destructive` variant
 *  so it is treated as a destructive/delete action.
 *
 * @returns
 * @example
 *
 * const {showConfirmation} = useConfirmationContext() // global context
 *
 * function onSubmit() {
 *  showConfirmation({
 *    title: "Foo",
 *    description: "bar",
 *    onConfirm: () => {
 *      // do something
 *      return true // this will close the dialog
 *    },
 *  ...
 * })
 * }
 */

export function ConfirmationDialog({
  show,
  setShow,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading = false,
  btnTitle,
  btnClassName,
}: Readonly<ConfirmationModalProps>) {
  return (
    <Dialog onOpenChange={(v) => setShow(v)} open={show}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title ?? "Delete"}</DialogTitle>
          <DialogDescription>
            {description ?? "Are you sure you want to delete this?"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              if (typeof onCancel === "function") {
                onCancel?.();
                return;
              }

              setShow(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className={cn(btnClassName)}
            isLoading={isLoading}
            onClick={() => onConfirm?.()}
          >
            {btnTitle ?? "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
