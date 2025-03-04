import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";

// Define the type for each item in the summary data
interface SummaryItem {
  id: string;
  title: string;
  amount: string;
}

// Define the props type for the Summary component
interface SummaryProps {
  data: SummaryItem[];
}

function Summary({ data }: SummaryProps) {
  return (
    <div className="pt-8 flex justify-center items-center sm:gap-16 gap-8 flex-wrap">
      {data?.map((item: SummaryItem) => (
        <div key={item.id} className="flex flex-col justify-center items-center gap-3">
          <Typography className="text-accent-100">{item.title}</Typography>
          <Button
            variant="outline"
            className="px-10 text-white text-xl font-semibold rounded-2xl"
          >
            {item.amount}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Summary;

