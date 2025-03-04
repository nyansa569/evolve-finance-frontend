import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "./success-modal";

type MomoPaymentModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedCard: {
      id: string;
      img: string;
      title: string;
      isCard: boolean;
    } | null;
  };

export function PaymentModal({open, setOpen, selectedCard }: MomoPaymentModalProps) {
    const [openSuccess, setOpenSuccess] = useState(false);
    console.log(selectedCard)
    const form = useForm({
          defaultValues: {
              name: "",
          },
      });

      const onSubmitHandler = (data: any) => {
        if (setOpen) {
          setOpen(false);
        }
        setOpenSuccess(true);
        console.log("Form Data:", data);
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mont sm:max-w-xl">
        <DialogHeader>
        </DialogHeader>
        <div className="pb-6">
            <div className="w-full pb-8">
                <p className="font-semibold text-center">Payment Information</p>
            </div>
            <div className="w-full py-4 max-h-[500px] overflow-auto">
                <section>
                    <h3 className="pb-3">CARD METHOD</h3>
                    <div className=" flex flex-col gap-6 ">
                        <Card className="bg-white">
                            <CardContent className="pt-6 flex items-center gap-4">
                                <div className="w-fit max-w-24 h-12">
                                    <img
                                        src={selectedCard?.img}
                                        alt={`Momo card`}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-gray-500">{selectedCard?.title}</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                {(selectedCard && !selectedCard.isCard) ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitHandler)} className="pt-8 flex flex-col justify-between gap-6">
                      <FormField
                        control={form?.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Momo Number</FormLabel>
                            <FormControl className="py-2">
                              <Input placeholder="050 051 1393" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form?.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Amount</FormLabel>
                            <FormControl className="py-2">
                              <Input placeholder="Enter amount" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-6 hover:bg-[#5A5853] bg-gradient-to-r from-[#1A212A] via-[#5A5853] to-[#1A212A] text-white"
                      >Pay Now</Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitHandler)} className="pt-8 flex flex-col justify-between gap-6">
                      <FormField
                        control={form?.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl className="py-2">
                              <Input placeholder="Alex Wontumi" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form?.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number</FormLabel>
                            <FormControl className="py-2">
                              <Input placeholder="6946 8149 5098 1007" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between items-center gap-3">
                        <span className="w-[60%]">
                          <FormField
                            control={form?.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry date</FormLabel>
                                <FormControl className="py-2">
                                  <Input placeholder="10 / 30 /25" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </span>
                        <span className="flex-1">
                          <FormField
                            control={form?.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl className="py-2">
                                  <Input placeholder="***" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </span>
                      </div>
                      <div className="flex justify-between items-end gap-3">
                        <span className="w-[60%]">
                          <FormField
                            control={form?.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Enter Amount</FormLabel>
                                <FormControl className="py-2">
                                  <Input placeholder="Enter amount" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </span>
                        <Button
                          type="submit"
                          variant="primary"
                          className="flex-1 py-6 mb-1 hover:bg-[#5A5853] bg-gradient-to-r from-[#1A212A] via-[#5A5853] to-[#1A212A] text-white"
                        >Pay Now</Button>
                      </div>
                    </form>
                  </Form>
                )}
            </div>
        </div>
      </DialogContent>
      <SuccessModal open={openSuccess} setOpen={setOpenSuccess} />
    </Dialog>
  )
}
