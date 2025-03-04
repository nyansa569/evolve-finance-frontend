import { LayoutGrid, LucideIcon } from "lucide-react";
import { RelativePathString } from "../types/components";
import DashboardPage from "../pages/dashboard";
import ProductsPage from "@/pages/products";
import AddProductsPage from "@/pages/add-products";
import InvoicePage from "@/pages/orders";
// import CreateOrder from "@/pages/orders/create-order";
import StocksPage from "@/pages/stocks";
import ProfilePage from "@/pages/profile";

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
    {
        path: "products",
        name: "Products",
        to: "/app/products",
        component: ProductsPage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
    },
    {
        path: "add-products",
        name: "AddProducts",
        to: "/app/add-products",
        component: AddProductsPage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
    },
    {
        path: "orders",
        name: "Invoices",
        to: "/app/orders",
        component: InvoicePage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
    },
    // {
    //     path: "create-order",
    //     name: "Create orders",
    //     to: "/app/create-orders",
    //     component: CreateOrder,
    //     exact: true,
    //     icon: LayoutGrid,
    //     children: [],
    //     subRoutes: [],
    // },
    {
        path: "stocks",
        name: "Stocks",
        to: "/app/stocks",
        component: StocksPage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
    },
    {
        path: "profile",
        name: "Profile",
        to: "/app/profile",
        component: ProfilePage,
        exact: true,
        icon: LayoutGrid,
        children: [],
        subRoutes: [],
    },
]