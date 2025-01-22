import { LayoutGrid, LucideIcon } from "lucide-react";
import { RelativePathString } from "../types/components";
import DashboardPage from "../pages/dashboard/pages/dashboard";

export type Route = {
    path: string;
    name: string;
    to: RelativePathString; //
    component: React.FC;
    exact?: boolean;
    icon: LucideIcon;
    svgIcon?: React.ReactNode;
    children: Omit<Route, "icon">[];
    subRoutes?: Route[];
};

export const routes: Route[] = [
    {
        path: "home",
        name: "Dashboard",
        to: "/app/home",
        component: DashboardPage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
      },
]