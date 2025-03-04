import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { CardType, ModalProps } from "@/types"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PaymentModal } from "./payment-modal";
import { CARDS } from "../../components/constants";


export function CardPaymentModal({open, setOpen}: ModalProps) {
    const [openMomo, setOpenMomo] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null)

    const handleCardClick = (card: CardType) => {
        setSelectedCard(card);
        if (setOpen) {
            setOpen(false);
        }
        setOpenMomo(true);
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mont sm:max-w-xl">
        <DialogHeader>
        </DialogHeader>
        <div className="pb-6">
            <div className="w-full pb-8">
                <p className="font-semibold text-center">Payment</p>
            </div>
            <div className="w-full py-4 max-h-[500px] overflow-auto">
                <section>
                    <h3 className="pb-3">CARD METHOD</h3>
                    <div className=" flex flex-col gap-6 ">
                        {
                            CARDS.filter(card => card.isCard).map((card, index) => (
                                <Card className="bg-white"
                                    onClick={() => handleCardClick(card)}
                                >
                                    <CardContent className="pt-6 flex items-center gap-4">
                                        <div className="w-fit max-w-24 h-12">
                                            <img
                                                src={card.img}
                                                alt={`Card ${index+1}`}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <p className="text-gray-500">{card.title}</p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </section>
                <section className="pt-8">
                    <h3 className="pb-3">MOBILE MONEY</h3>
                    <div className=" flex flex-col gap-6 ">
                        {
                            CARDS.filter(card => !card.isCard).map((card, index) => (
                                <Card className="bg-white"
                                    onClick={() => handleCardClick(card)}
                                >
                                    <CardContent className="pt-6 flex items-center gap-4">
                                        <div className="w-fit max-w-24 h-12">
                                            <img
                                                src={card.img}
                                                alt={`Card ${index+1}`}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <p className="text-gray-500">{card.title}</p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
      </DialogContent>
      <PaymentModal open={openMomo} setOpen={setOpenMomo} selectedCard={selectedCard} />
    </Dialog>
  )
}