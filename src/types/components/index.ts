import { PropsWithChildren } from "react";


export type RelativePathString = `/app/${string}`;

export type LoaderProps = Partial<{
    size: number;
    speed: number;
    color: string;
}>;

export type ValueItemProps = {
    label: string;
    value: string;
};

export interface TableFacetOptions extends ValueItemProps {
    icon?: React.ComponentType<{ className?: string }>;
}

export type TableFacetProps = {
    key: string;
    label: string;
    options: TableFacetOptions[];
};

export interface ModalProps extends PropsWithChildren {
    open: boolean;
    setOpen?: (v: boolean) => void;
    selectedCard?: CardType | null;
    amount: number;
}

export interface User {
    email: string;
    username: string;
    verifiedMsisdn: string;
    roles: string[];
    accessToken: string;
    tokenType: string;
    name?: string;
}

export type ProductProps = {
    id: string;
    product_name: string;
    image: string;
    price: string;
    quantity: number;
    availability: "Not available" | "Available",
    branch: string;
}

export type TransactionProps = {
    id: string;
    date: string;
    type: string;
    amount: string;
    status: "Withdrawal" | "Paid",
}

export type BestSellingProps = {
    id: string,
    product: string,
    price: string,
    quantity: string,
}

export type CardType = {
    id: string;
    img: string;
    title: string;
    isCard: boolean;
};

export type OrdersProps = {
    id: string,
    order_id: string,
    date: string,
    customer: string,
    product: string,
    total: string,
    status: "Pending" | "Success",
};