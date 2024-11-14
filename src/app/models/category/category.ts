
export class Category {
    id: number = 0;
    name: string = "";
    status: number = 0;
    description: string = "";
  
    constructor(data?: Partial<Category>) {
        Object.assign(this, data);
    }
}