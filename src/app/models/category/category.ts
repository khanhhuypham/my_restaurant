
export class Category {
    id: number = 0;
    name: string = "";
    active: boolean = false;
    description: string = "";
  
    constructor(data?: Partial<Category>) {
        Object.assign(this, data);
    }
}