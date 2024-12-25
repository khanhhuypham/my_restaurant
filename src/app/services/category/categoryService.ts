

import { BaseResponse } from "../../models/base-response"

import axiosClient from "../configURL"
import { Category } from "../../models/category/category"
import { CATEGORY_TYPE } from "../../constants/enum/CATEGORY_TYPE"

export const categoryService = {
    version: "v1",

    List: async (type?: CATEGORY_TYPE) => {
        const response = await axiosClient().get<BaseResponse<Category[]>>("category", {
            params: {
                type
            }
        })
        return response.data
    },


    Update: async (category: Category) => {
        const { data } = await axiosClient().put<BaseResponse<undefined>>(`category/${category.id}`, category)
        return data
    },
    Create: async (category: Category) => {
        const { data } = await axiosClient().post<BaseResponse<undefined>>(`category`, category)
        return data
    },



} 