import { Category } from "../category/category";
import { Unit } from "../unit/unit";

export class ChidlrenItem {
    id: number = 0;
    imgSrc: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;

    unit: Unit | undefined ;

    category: Category | undefined;



    constructor(data?: Partial<ChidlrenItem>) {
        Object.assign(this, data);
    }
}