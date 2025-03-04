import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { ModalProps } from "@/types"
import { DialogTitle } from "@radix-ui/react-dialog"
import { EllipsisVertical, ImageDown, Link2, Paperclip, Smile, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"

export function EmailModal({open, setOpen}: ModalProps) {
    const form = useForm({
        defaultValues: {
            name: "",
        },
    });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            New mail
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4 pb-20">
            <Form {...form}>
                <form>
                    <div className="w-full flex justify-between items-center gap-4 border-b">
                        <input type="text"
                            placeholder="To"
                            className="flex-1 pb-2 text-sm border-none outline-none focus:outline-none focus:ring-0"
                        />
                        <p className="w-fit">Cc</p>
                    </div>
                    <div className="w-full pt-4 flex justify-between items-center gap-4 border-b">
                        <input type="text"
                            placeholder="Subject"
                            className="flex-1 pb-2 text-sm border-none outline-none focus:outline-none focus:ring-0"
                        />
                    </div>
                </form>
            </Form>
            <div className="pt-4">
                <p className="text-sm">Hello Alex,</p>
                <p className="text-sm">Thank you for your order!</p>
                <p className="text-sm">To view the invoice for your order and</p>
                <p className="text-sm italic">complete the payment, kindly click on the link below:</p>
                <p className="pt-4 text-[#1237C9] text-sm italic">example.com/invoice/105</p>
            </div>
            </div>
        <DialogFooter>
            <div className="w-full flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button 
                        type="submit"
                        variant="primary"
                        className="bg-gray-200 hover:bg-gray-300"
                    >Share</Button>
                    <div className="flex px-2 items-center gap-3 text-[#6B6B6B]">
                        <div>
                            <Paperclip size={20} />
                        </div>
                        <div>
                            <Link2 size={20} />
                        </div>
                        <div>
                            <ImageDown size={20} />
                        </div>
                        <div>
                            <Smile size={20} />
                        </div>
                        <div>
                            <EllipsisVertical size={20} />
                        </div>
                    </div>
                </div>

                <div>
                    <Trash2 size={20} />
                </div>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
