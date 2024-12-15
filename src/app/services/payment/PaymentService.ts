


import { BaseResponse } from "../../models/base-response"
import axiosClient from "../configURL"
import { ItemEntity } from "../../models/Item/item"
import { Printer } from "../../models/printer/printer"
import { CheckoutForm } from "../../models/payment/checkout-form"
import { StripeCheckoutResponse } from "../../models/payment/stripe-checkout-response"


export const paymentService = {

    Charge: async () => {
        const { data } = await axiosClient().post<BaseResponse<undefined>>(`checkout`, {
            name:"",
            email:"",
            items:[]
        })
        return data
    },


    StripeHostedCheckout: async (value:CheckoutForm) => {
        const { data } = await axiosClient().post<BaseResponse<StripeCheckoutResponse>>(`stripe-host-checkout`, value)
        return data
    },


} 