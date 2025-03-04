import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { ModalProps } from "@/types"
import { Download, File } from "lucide-react"
import { EmailModal } from "./email-modal"
import { useState } from "react"
import { ProceedPayModal } from "./proceed-modal"

export function InvoiceModal({open, setOpen}: ModalProps) {
    const [openEmail, setOpenEmail] = useState(false);
    const [openProceed, setOpenProceed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogDescription>
            Invoice #e001-dq
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <div className="flex justify-between gap-4">
                <div className="">
                    <p className="text-sm">From</p>
                    <div className="font-medium">Urban Plug</div>
                </div>
                <div className="">
                    <p className="text-sm">Receipient</p>
                    <div className="font-medium">Alex Wontumi</div>
                    <div className="font-medium text-sm">alex101@gmail.com</div>
                </div>
            </div>
            <div className="w-full py-4">
                <div className="pb-2 text-lg font-medium">Product</div>
                <div className="w-full h-96 p-4 flex flex-col justify-between bg-gray-100 rounded-md">
                    <div className="flex justify-between gap-3">
                        <div>Item</div>
                        <div>Price</div>
                        <div>Qty</div>
                        <div>Amount</div>
                    </div>
                    <div className='w-full space-y-1'>
                        <div className='flex justify-between items-center text-base'>
                            <span>Subtotal</span>
                            <span className='text-base font-medium'>$100.94</span>
                        </div>
                        <div className='flex justify-between items-center text-sm'>
                            <span>Discount</span>
                            <span>15%</span>
                        </div>
                        <div className='pb-2 flex justify-between items-center text-sm'>
                            <span>Platform fees</span>
                            <span>2.50</span>
                        </div>
                        <div className='w-full pt-2 border-t border-accent-400 flex justify-between items-center text-base'>
                            <span>Total</span>
                            <span className='text-base font-medium'>$1500.32</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DialogFooter>
            <div className="w-full flex justify-between items-center gap-4">
                <div className="px-3 py-1.5 flex justify-between items-center gap-8 rounded-xl bg-gray-200">
                    <div className="flex justify-center items-center gap-2">
                        <File size={18} />
                        <div className="flex flex-col gap-0 text-sm">
                            <span className="font-medium">Product list</span>
                            <span className="text-[12px]">450kb</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-1 text-sm text-[#1C44E3]">
                        <p>Download</p>
                        <Download size={18} color="#1C44E3" />
                    </div>
                </div>
                <Button 
                    onClick={() => {
                        if (setOpen) {
                            setOpen(false);
                        }
                        setOpenEmail(true);
                      }}
                    variant="primary"
                    className="bg-gray-200 hover:bg-gray-300"
                >Email</Button>
                <Button
                    onClick={() => {
                        if (setOpen) {
                            setOpen(false);
                        }
                        setOpenProceed(true);
                      }}
                    type="submit"
                    variant="primary"
                    className="bg-gray-200 hover:bg-gray-300"
                >Share</Button>
            </div>
        </DialogFooter>
      </DialogContent>
      {/* <EmailModal open={openEmail} setOpen={setOpenEmail} />
      <ProceedPayModal open={openProceed} setOpen={setOpenProceed} /> */}
    </Dialog>
  )
}
