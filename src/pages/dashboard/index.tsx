import HeaderTitle from "@/components/shared/title";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Summary from "./summary";
import { useEffect, useState } from "react";
import { WalletModal } from "./wallet-modal";
import TransactionHistory from "./transaction-history";
import BestSelling from "./best-selling";
import { getDashboardData } from "@/services/dashboard_service";
import { useNavigate } from "react-router-dom";

// Interface for the API response
export interface DashBoardData {
  totalInvoices: number;
  totalUsers: number;
  totalProducts: number; // updated to number instead of string based on API response
  invoiceData: {
    overallTotalAmount: string;
    overallTotalTax: string;
  };
  status: string;
}

function DashboardPage() {
  const navigate = useNavigate();

  interface SummaryItem {
    id: string;
    title: string;
    amount: string;
  }

  const [error, setError] = useState("");
  const token = localStorage.getItem("token") || "";
  const storedUser = localStorage.getItem("userEvlvCSM");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.role || "";
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashBoardData] = useState<DashBoardData | null>(
    null
  ); // updated type to DashBoardData

  useEffect(() => {
    // console.log("stored user", storedUser);
    // console.log(" user", user);
    // console.log(" role", role);
    if (user == null) {
      setError("User not found");
    }
  }, [user]); // added dependency for user

  const fetchDashBoard = async () => {
    setLoading(true);
    try {
      const response = await getDashboardData(role, token);
      // console.log("response", response);
      setDashBoardData(response || null); // updated to handle response as DashBoardData
    } catch (error) {
      // console.error(error);
      // setError("Failed to fetch dashboard data");
      navigate("/signin");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashBoard(); // added useEffect to call fetchDashBoard when component mounts
  }, [role, token]);

  const revenueData: SummaryItem[] = [
    {
      id: "1",
      title: "Total Revenue",
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHS",
      }).format(
        parseFloat(dashboardData?.invoiceData?.overallTotalAmount || "0.00")
      )}`,
    },
    {
      id: "2",
      title: "Total Products",
      amount: `${dashboardData?.totalProducts?.toLocaleString() || "0"}`,
    },
    {
      id: "3",
      title: "Total Tax",
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHS",
      }).format(
        parseFloat(dashboardData?.invoiceData?.overallTotalTax || "0.00")
      )}`,
    },
  ];

  const [openWallet, setOpenWallet] = useState(false);

  return (
    <div className="mont w-full h-full py-8">
      <section className="" style={{
        padding:"2rem"
      }}>
        {error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              fontSize: "5rem",
              color: "#ff0000",
            }}
          >
            <p>{error}</p>
          </div>
        )}
        {!error && (
          <>
            <div className="flex justify-between items-center gap-4">
              <HeaderTitle title={`${user?.name}'s Dashboard`} />
              <HeaderTitle title={`${user?.companyName}'s Dashboard`} />
              <Button
                variant="outline"
                className="flex justify-center gap-2 text-white"
                onClick={() => setOpenWallet(true)}
              >
                <Wallet />
                Wallet
              </Button>
            </div>
            <Summary data={revenueData} />
            <div className="pt-16 flex xl:flex-row flex-col justify-between gap-1">
              <div className="flex-1"><TransactionHistory /></div>
              <div className="flex-1"><BestSelling /></div>
            </div>
          </>
        )}
      </section>
      <WalletModal
        open={openWallet}
        setOpen={setOpenWallet}
        amount={
          dashboardData?.invoiceData?.overallTotalAmount
            ? parseFloat(dashboardData.invoiceData.overallTotalAmount)
            : 0
        }
      />
    </div>
  );
}

export default DashboardPage;
