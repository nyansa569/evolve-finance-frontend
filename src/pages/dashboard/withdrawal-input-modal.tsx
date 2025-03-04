import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

const NETWORKS = ["MTN", "TIGO", "TELECEL"];
const PAYMENT_METHODS = ["Mobile Money", "Bank Account", "Credit Card"];

export function WithdrawalInput({
  open,
  setOpen,
  amountBalance,
  platformFeePercentage = 5, // 5% Platform Fee
  taxPercentage = 6, // 6% Tax
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  amountBalance: number;
  platformFeePercentage?: number;
  taxPercentage?: number;
}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [network, setNetwork] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCVC] = useState("");

  // Calculate deductions
  const platformFee = (platformFeePercentage / 100) * withdrawalAmount;
  const totalTaxes = (taxPercentage / 100) * withdrawalAmount;
  const totalDeductions = platformFee + totalTaxes;
  const finalAmountReceived = withdrawalAmount - totalDeductions;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg pb-0">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle className="font-medium text-[#14323F]">WITHDRAW FUNDS</DialogTitle>
        </DialogHeader>

        <div className="pt-4 pb-6 flex flex-col gap-4">
          <div className="p-4 bg-gray-200 rounded-xl text-center text-gray-700">
            <p className="text-sm">CURRENT BALANCE</p>
            <p className="text-3xl font-bold text-[#14323F]">${amountBalance.toLocaleString()}</p>
          </div>

          {/* Select Payment Method */}
          <label className="text-sm font-medium">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            <option value="">Choose Method</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>

          {/* Dynamic Input Fields Based on Payment Method */}
          {paymentMethod === "Mobile Money" && (
            <>
              <label className="text-sm font-medium">Select Network:</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white"
              >
                <option value="">Choose Network</option>
                {NETWORKS.map((net) => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
              </select>
              <label className="text-sm font-medium">Mobile Money Number:</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full p-3 border rounded-lg"
              />
            </>
          )}

          {paymentMethod === "Bank Account" && (
            <>
              <label className="text-sm font-medium">Account Name:</label>
              <input
                type="text"
                placeholder="Enter account name"
                className="w-full p-3 border rounded-lg"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <label className="text-sm font-medium">Account Number:</label>
              <input
                type="text"
                placeholder="Enter account number"
                className="w-full p-3 border rounded-lg"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </>
          )}

          {paymentMethod === "Credit Card" && (
            <>
              <label className="text-sm font-medium">Card Number:</label>
              <input
                type="text"
                placeholder="Enter card number"
                className="w-full p-3 border rounded-lg"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <label className="text-sm font-medium">CVC:</label>
              <input
                type="text"
                placeholder="Enter CVC"
                className="w-full p-3 border rounded-lg"
                value={cvc}
                onChange={(e) => setCVC(e.target.value)}
              />
            </>
          )}

          {/* Withdrawal Amount */}
          <label className="text-sm font-medium">Withdrawal Amount:</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= amountBalance) {
                  setWithdrawalAmount(value);
                }
              }}
            placeholder="Enter amount"
            className="w-full p-3 border rounded-lg"
          />

          {/* Summary */}
          <div className="p-4 bg-gray-100 rounded-xl text-sm text-gray-700">
            <p>Platform Fee ({platformFeePercentage}%): 
              <span className="font-bold"> ${platformFee.toFixed(2)}</span>
            </p>
            <p>Total Taxes ({taxPercentage}%): 
              <span className="font-bold"> ${totalTaxes.toFixed(2)}</span>
            </p>
            <p className="mt-2 text-lg font-bold text-[#14323F]">
              Amount You Receive: ${finalAmountReceived.toFixed(2)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <Button className="px-6 py-3 border text-red-600 rounded-lg" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="px-6 py-3 bg-green-600 text-white rounded-lg">
              Withdraw
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
