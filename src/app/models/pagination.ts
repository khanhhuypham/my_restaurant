export class Pagination {
    page:number = 0;
    limit: number = 0;
    total_record: number = 0;
    search_key:string = "";
    
    constructor(item?: Partial<Pagination>) {
        Object.assign(this, item);
    }
}