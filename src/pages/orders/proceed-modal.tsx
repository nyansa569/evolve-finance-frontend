import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { ModalProps } from "@/types"
import { useState } from "react"
import { CardPaymentModal } from "./card-payment-modal"

export function ProceedPayModal({open, setOpen}: ModalProps) {
    const [openCardPayment, setOpenCardPayment] = useState(false);

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
            
            <Button 
                type="submit"
                onClick={() => {
                    if (setOpen) {
                        setOpen(false);
                    }
                    setOpenCardPayment(true);
                }}
                variant="primary"
                className="w-full py-6 hover:bg-[#5A5853] bg-gradient-to-r from-[#1A212A] via-[#5A5853] to-[#1A212A] text-white"
            >Proceed to pay</Button>
        </DialogFooter>
      </DialogContent>
      <CardPaymentModal open={openCardPayment} setOpen={setOpenCardPayment} />
    </Dialog>
  )
}
