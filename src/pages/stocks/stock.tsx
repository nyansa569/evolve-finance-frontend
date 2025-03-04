import { Card } from "@/components/ui/card"

const STOCKS = [
  {
    id: "1",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "1",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "2",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "3",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "4",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "5",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
  {
    id: "6",
    title: "Adidas NEO Light Green",
    sold: 100,
  },
]

function Stock() {
  return (
    <div className="w-full max-h-[600px] overflow-auto">
      <section className="w-full h-fit flex flex-col gap-4">
        {STOCKS.map((stock) => (
          <Card className="w-full py-3 px-4 flex justify-between items-center gap-3 bg-[#14323F] rounded-md border-none">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-white rounded-md"></div>
              <div className="">
                <h3 className="text-lg font-semibold text-white">{stock.title}</h3>
                <p className="text-gray-500">{stock.sold} sold</p>
              </div>
            </div>
            <div className="flex justify-end items-center gap-3">
              <p className="text-sm text-gray-500">Out of stock</p>
              <div className="w-2 h-8 relative bg-gray-400 rounded-t-md">
                <div className="h-4 absolute bottom-0 left-0 right-0 bg-red-700 rounded-t-md"></div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}

export default Stock