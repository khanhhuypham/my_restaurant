export class Printer {
    id: number = 0;
    name: string = "";
    ip_address: string = "";
    printer_name: string = "";
    port: number = 9100;
    connection_type: number = 0;
    print_number: number = 1;
    is_print_each_paper: boolean = false;
    status: boolean = false;
    type: number = 0;
 
    constructor(item?: Partial<Printer>) {
        Object.assign(this, item);
    }
}