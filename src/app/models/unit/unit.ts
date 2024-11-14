
export class Unit {
    id: number = 0;
    name: string = "";
  
    constructor(data?: Partial<Unit>) {
        Object.assign(this, data);
    }
}