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
}