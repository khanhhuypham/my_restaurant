
export class ItemEntity {
    id: string = "";
    category: string = "";
    imgSrc: string = "";
    name: string = "";
    description: string = "";
    price: number = 0;

    constructor(data?: Partial<ItemEntity>) {
        Object.assign(this, data);
    }
}