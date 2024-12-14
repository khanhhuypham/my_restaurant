

import { BaseResponse } from "../../models/base-response"

import axiosClient from "../configURL"
import { Category } from "../../models/category/category"

export const categoryService = {
    version: "v1",

    List: async () => {
        const { data } = await axiosClient().get<BaseResponse<Category[]>>("category")
        return data
    },


    Update: async (category:Category) => {
        const { data } = await axiosClient().put<BaseResponse<undefined>>(`category/${category.id}`,category)
        return data
    },
    Create: async (category:Category) => {
        const { data } = await axiosClient().post<BaseResponse<undefined>>(`category`,category)
        return data
    },

   
   
} 