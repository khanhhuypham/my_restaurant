import { CategoryType } from "../../constants/enum";

export class Category {
    id: number = 0;
    name: string = "";
    active: boolean = false;
    description: string = "";
    type: CategoryType = CategoryType.FOOD
    select: boolean = false

    constructor(initialValues: Partial<Category> = {}) {
        Object.assign(this, initialValues);
    }

}