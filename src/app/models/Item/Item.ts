import { CATEGORY_TYPE } from "../../constants/enum/CATEGORY_TYPE";
import { ChidlrenItem } from "./item-children";

export class ItemEntity {
    id: number = 0;
    image: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;
    unit_id: number = 0 ;
    unit_type: string = "";
    category_id:number = 0;
    category_name: string = "";
    category_type: CATEGORY_TYPE = CATEGORY_TYPE.food
    children: ChidlrenItem[] = [];
    out_of_stock: boolean = false;
    sell_by_weight:boolean = false;
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