// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
// } from "@/components/ui/dialog"
// import { ModalProps } from "@/types"
// import { DialogTitle } from "@radix-ui/react-dialog"
// import { Upload } from "lucide-react"
// import { useState } from "react"
// import { WithdrawalInput } from "./withdrawal-input-modal"

// export function WalletModal({open, setOpen}: ModalProps, amount: number) {
//     const [openWithdrawal, setOpenWithdrawal] = useState(false);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-md pb-0">
//         <DialogHeader className="pb-2 border-b ">
//           <DialogTitle className="font-medium text-[#14323F]">
//             WALLET
//           </DialogTitle>
//         </DialogHeader>
//         <div className="pt-4 pb-20 flex flex-col items-center gap-2">
//             <p className="text-gray-500 text-sm">CURRENT BALANCE</p>
//             <div className="pb-4 text-5xl font-bold text-[#14323F]">  {typeof amount === "number" ? amount.toLocaleString() : "Invalid amount"}</div>
//             <Button
//                 onClick={() => {
//                     setOpenWithdrawal(true);
//                     setOpen?.(false);
//                 }}
//                 className="px-10 py-7 flex gap-3 text-gray-500 text-xl font-light bg-gray-200 hover:bg-gray-100 rounded-2xl shadow-[0px_4px_6px_rgba(0,0,0,0.4)]"
//             >
//                 <Upload />
//                 Withdraw
//             </Button>
//         </div>
//       </DialogContent>
//         <WithdrawalInput open={openWithdrawal} setOpen={setOpenWithdrawal} amount={100}/>
//     </Dialog>
//   )
// }


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Upload } from "lucide-react";
import { useState } from "react";
import { WithdrawalInput } from "./withdrawal-input-modal";

export function WalletModal({ open, setOpen, amount }: { open: boolean; setOpen: (v: boolean) => void; amount: number }) {
  const [openWithdrawal, setOpenWithdrawal] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md pb-0">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle className="font-medium text-[#14323F]">WALLET</DialogTitle>
        </DialogHeader>

        <div className="pt-4 pb-20 flex flex-col items-center gap-2">
          <p className="text-gray-500 text-sm">CURRENT BALANCE</p>
          <div className="pb-4 text-5xl font-bold text-[#14323F]">
            {amount.toLocaleString()}
          </div>

          <Button
            onClick={() => {
              setOpenWithdrawal(true);
              setOpen(false);
            }}
            className="px-10 py-7 flex gap-3 text-gray-500 text-xl font-light bg-gray-200 hover:bg-gray-100 rounded-2xl shadow-md"
          >
            <Upload />
            Withdraw
          </Button>
        </div>
      </DialogContent>

      <WithdrawalInput open={openWithdrawal} setOpen={setOpenWithdrawal} amountBalance={amount} platformFeePercentage={5} taxPercentage={5} />
    </Dialog>
  );
}
