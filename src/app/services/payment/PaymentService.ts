


import { BaseResponse } from "../../models/base-response"
import axiosClient from "../configURL"
import { ItemEntity } from "../../models/Item/Item"
import { Printer } from "../../models/printer/Printer"


export const paymentService = {

    Charge: async () => {
        const { data } = await axiosClient().post<BaseResponse<undefined>>(`checkout`, {
            name:"",
            email:"",
            items:[]
        })
        return data
    },

    

} 