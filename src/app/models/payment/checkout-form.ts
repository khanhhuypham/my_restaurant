export class CheckoutForm {
    id: number = 0;
    name: string = "";
    currency: string = "";
    successUrl: string = "";
    cancelUrl: string = "";
    email: string = "";
    items:ItemOfCheckoutForm[] = []
 
    constructor(item?: Partial<CheckoutForm>) {
        Object.assign(this, item);
    }
}

export class ItemOfCheckoutForm {
    name: string = "";
    quantity: number = 0;
    amount:number = 0;
    currency: string = "";
    
    constructor(data?: Partial<ItemOfCheckoutForm>) {
        Object.assign(this, data);
    }
}
