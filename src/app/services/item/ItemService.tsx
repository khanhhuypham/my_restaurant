

import { idText } from "typescript"
import { BaseResponse } from "../../models/base-response"
import { Department } from "../../models/department"
import axiosClient from "../configURL"
import { PersonnelList } from "../../models/personnel"
import { ItemEntity, ItemEntityPage } from "../../models/Item/Item"
import { Pagination } from "../../models/pagination"
import { ChidlrenItem } from "../../models/Item/item-children"
import { Unit } from "../../models/unit/unit"
import { Children } from "react"
import { Category } from "../../models/category/category"


export const ItemService = {
	
    List: async (pagination:Pagination) => {
        const {data} = await axiosClient().get<BaseResponse<ItemEntityPage>>(`item`,{
            params: {pagination},
        })
        return data
    },

    ListOfChilrenItem: async () => {
        const {data} = await axiosClient().get<BaseResponse<ChidlrenItem[]>>(`children-item`)
        return data
    },


    ListOfUnit: async () => {
        const {data} = await axiosClient().get<BaseResponse<Unit[]>>(`unit`)
        return data
    },



    Detail: async (id:number) => {
        const {data} = await axiosClient().get<BaseResponse<Department>>(`v1/departments/${id}/detail`)
        return data
    },

   
  
    Update: async (item:ItemEntity) => {
        const {data} = await axiosClient().patch<BaseResponse<undefined>>(`item/${item.id}`,{
            name:item.name,
            price:item.price,
            children:item.children.map((child) =>({id:child.id, quantity:0})),
            unit_id:item.unit?.id,
            category_id:item.category?.id,
            out_of_stock: item.out_of_stock
        })
        return data
    },

    Create: async (item:ItemEntity) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/departments/create`,{
            // id:department.id,
            // name:department.name,
            // parent_department_id:department.parent_department_id,
            // description:department.description,
            // source_color:department.source_color
        })
        return data
    },

} 