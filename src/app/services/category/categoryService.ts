

import { BaseResponse } from "../../models/base-response"
import {  CustomerDetail, CustomerDetailData } from "../../models/customer/customer"

import axiosClient from "../configURL"
import { Category } from "../../models/category/category"

export const categoryService = {
    version: "v1",

    List: async () => {
        const { data } = await axiosClient(31154).get<BaseResponse<Category[]>>("category")
        return data
    },


    Update: async (category:Category) => {
        const { data } = await axiosClient(31154).patch<BaseResponse<undefined>>(`category/${category.id}`,category)
        return data
    },
    Create: async (category:Category) => {
        const { data } = await axiosClient(31154).post<BaseResponse<undefined>>(`category`,category)
        return data
    },

   
   
} 