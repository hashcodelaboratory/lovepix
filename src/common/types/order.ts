import {FormInputs} from "./form";
import {Summary} from "./summary";

type Image = {
    name: string;
    url: string;
    width: number;
    height: number;
    qty: number;
    origin: string;
    material: string;
    price: number;
}


export type Order = {
    id: string;
    date: Date;
    form: FormInputs;
    shoppingCart: {
        images: Image[];
    };
    summary: Summary;
    image: Image;
    totalPrice: number;
}