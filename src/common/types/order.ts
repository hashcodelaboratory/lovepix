import {Delivery, Payment} from "../enums/summary";

type Image = {
    name: string;
    url: string;
    width: number;
    height: number;
    qty: number;
    origin: string;
    material: string;
}


export type Order = {
    id: string;
    date: Date;
    form: {
        address: string;
        city: string;
        company: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        postalCode: string;
    };
    shoppingCart: {
        images: Image[];
    };
    summary: {
        delivery: Delivery;
        payment: Payment;
    }
    image: Image;
}