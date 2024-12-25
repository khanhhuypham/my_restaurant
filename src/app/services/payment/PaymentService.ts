


import { BaseResponse } from "../../models/base-response"
import axiosClient from "../configURL"
import { ItemEntity } from "../../models/item/item"
import { CheckoutForm } from "../../models/payment/checkout-form"
import { StripeCheckoutResponse } from "../../models/payment/stripe-checkout-response"


export const paymentService = {

    HostCheckout: async (value:CheckoutForm) => {
        const { data } = await axiosClient().post<BaseResponse<string>>(`host-checkout`,value)
        return data
    },


    StripeHostedCheckout: async (value:CheckoutForm) => {
        const { data } = await axiosClient().post<BaseResponse<StripeCheckoutResponse>>(`stripe-host-checkout`, value)
        return data
    },


} 