import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog"
import { ModalProps } from "@/types"
import { Check } from "lucide-react"

export function SuccessModal({open, setOpen}: ModalProps) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg py-16">
        <div className="pt-4 pb-16 flex flex-col justify-center items-center">
            <div className="w-fit p-3 rounded-full bg-[#AFF8E4]">
                <div className="w-fit p-3 rounded-full bg-[#80D9C0]">
                    <div className="w-32 h-32 flex flex-col justify-center items-center rounded-full bg-[#26AE88]">
                        <Check color="#fff" size={50} />
                    </div>
                </div>
            </div>
            <div className="w-full pt-8">
                <div className="text-center text-lg font-medium">Payment Successful</div>
                <p className="text-center text-sm">A receipt has been sent to your email address</p>
            </div>
        </div>
        <DialogFooter>
            <Button
                type="submit"
                onClick={() => {
                    if (setOpen) {
                        setOpen(false);
                      }
                }}
                variant="primary"
                className="flex-1 py-6 mb-1 hover:bg-[#5A5853] bg-gradient-to-r from-[#1A212A] via-[#5A5853] to-[#1A212A] text-white"
            >Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
