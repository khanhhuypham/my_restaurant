export class Pagination {
    cursor:number = 0;
    offset: number = 0;
    total_record: number = 0;
    key_search:string = "";
    
    constructor(item?: Partial<Pagination>) {
        Object.assign(this, item);
    }
}