import { Category } from "../category/category";
import { Unit } from "../unit/unit";
import { ChidlrenItem } from "./item-children";

export class ItemEntity {
    id: number = 0;
    imgSrc: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;
    unit: Unit | undefined ;
    category: Category | undefined;
    children: ChidlrenItem[] = [];
    out_of_stock: boolean = false;
    printer_id: number | undefined;
    quantity: number = 0;
    note: string | undefined ;


    constructor(data?: Partial<ItemEntity>) {
        Object.assign(this, data);
    }
}

export class ItemEntityPage {

    list: ItemEntity[] = [];
    total_record: number = 0
    page: number = 0;
    limit: number = 0;

    constructor(data?: Partial<ItemEntityPage>) {
        Object.assign(this, data);
    }

}