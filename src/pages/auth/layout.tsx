import LoadingComponent from "@/components/loading-component";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {

    navigate("/app/home", { replace: true });
  }, []);

  if (isLoading) return <LoadingComponent />;

  return <>{children}</>;
}
