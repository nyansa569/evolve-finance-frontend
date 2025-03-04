import { BestSellingProps, CardType, OrdersProps, ProductProps, TransactionProps } from "../../../types/index";
import food from '../../../assets/images/food-img.png';
import visaCard from '../../../assets/images/icons/visa_card.svg';
import masterCard from '../../../assets/images/icons/master_card.svg';
import mtnCard from '../../../assets/images/icons/mtn_momo.svg';
import telecelCard from '../../../assets/images/icons/telecel_momo.svg';
import airtelTigoCard from '../../../assets/images/icons/AT_momo.svg';
export const STORE_KEY = "evolve-root";

export const PRODUCTS: ProductProps[] = [
    {
        id: "1",
        product_name: "Laptop",
        image: food,
        price: "$43,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "2",
        product_name: "Smartphone",
        image: food,
        price: "$3,430",
        quantity: 3,
        availability: "Available",
        branch: "Cape Coast"
    },
    {
        id: "3",
        product_name: "Laptop",
        image: food,
        price: "$92,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "4",
        product_name: "Laptop",
        image: food,
        price: "$55,430",
        quantity: 8,
        availability: "Available",
        branch: "Cape Coast"
    },
    {
        id: "5",
        product_name: "Laptop",
        image: food,
        price: "$67,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "6",
        product_name: "Laptop",
        image: food,
        price: "$12,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
    {
        id: "7",
        product_name: "Laptop",
        image: food,
        price: "$18,430",
        quantity: 8,
        availability: "Not available",
        branch: "Cape Coast"
    },
]

export const TRANSACTION_HISTORY: TransactionProps[] = [
    {
        id: "1",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Withdrawal",
    },
    {
        id: "2",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Paid",
    },
    {
        id: "3",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Paid",
    },
    {
        id: "4",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Withdrawal",
    },
    {
        id: "5",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Withdrawal",
    },
    {
        id: "6",
        date: "08/02/2025",
        type: "Withdrawal",
        amount: "$ 500",
        status: "Paid",
    },
]

export const BEST_SELLINGS: BestSellingProps[] = [
    {
        id: "1",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "2",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "3",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "4",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "5",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "6",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
    {
        id: "7",
        product: "Adidas Adicane Slides",
        price: "$ 75",
        quantity: "305 in Stock",
    },
]

export const ORDERS: OrdersProps[] = [
    // {
    //     order_id: "#656",
    //     id: "1",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Pending",
    // },
    // {
    //     order_id: "#879",
    //     id: "2",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
    // {
    //     order_id: "#175",
    //     id: "3",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
    // {
    //     order_id: "#850",
    //     id: "4",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
    // {
    //     order_id: "#499",
    //     id: "5",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Pending",
    // },
    // {
    //     order_id: "#393",
    //     id: "6",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
    // {
    //     order_id: "#599",
    //     id: "7",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Pending",
    // },
    // {
    //     order_id: "#507",
    //     id: "8",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
    // {
    //     order_id: "#102",
    //     id: "9",
    //     date: "01/02/2025",
    //     customer: "Alex Wontumi",
    //     product: "Frank Olivier Perfume",
    //     total: "$ 100",
    //     status: "Success",
    // },
]

export const CARDS: CardType[] = [
    {
        id: "1",
        img: visaCard,
        title: "VISA CARD",
        isCard: true,
    },
    {
        id: "2",
        img: masterCard,
        title: "MASTER CARD",
        isCard: true,
    },
    {
        id: "3",
        img: mtnCard,
        title: "MTN MOMO",
        isCard: false,
    },
    {
        id: "4",
        img: telecelCard,
        title: "TELECEL CASH",
        isCard: false,
    },
    {
        id: "5",
        img: airtelTigoCard,
        title: "AIRTEL TIGO CASH",
        isCard: false,
    }
]