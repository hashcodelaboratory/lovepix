import {FormInputs} from "./form";
import {Summary} from "./summary";
import {Material} from "../enums/material";

export type Image = {
    name: string;
    url: string;
    width: number;
    height: number;
    qty: number;
    origin: string;
    material: Material;
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
    pdf: string;
}