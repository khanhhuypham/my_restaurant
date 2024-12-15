export class StripeCheckoutResponse {


    status: number = 0;
    message: string = "";
    sessionId: string = "";
    sessionUrl: string = "";
    
    constructor(item?: Partial<StripeCheckoutResponse>) {
        Object.assign(this, item);
    }
}