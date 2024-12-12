

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
import { menuDataArray } from "../../assets/menuData"


export const ItemService = {
	
    List: async ({pagination,category_id}:{pagination:Pagination;category_id:number}) => {
        const {data} = await axiosClient().get<BaseResponse<ItemEntityPage>>(`item`,{
            params: {...pagination,category_id},
        })

        let result = {...data.data,list:mappImage( data.data.list)}

        return {...data,data:result}
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
        console.log(item.description)
        const {data} = await axiosClient().patch<BaseResponse<undefined>>(`item/${item.id}`,{
            name:item.name,
            price:item.price,
            children:item.children.map((child) =>({id:child.id, quantity:0})),
            unit_id:item.unit?.id,
            printer_id:item.printer_id,
            category_id:item.category_id,
            out_of_stock: item.out_of_stock,
            description:item.description
        })
        return data
    },

    Create: async (item:ItemEntity) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`item`,{
            name:item.name,
            price:item.price,
            children:item.children.map((child) =>({id:child.id, quantity:0})),
            unit_id:item.unit?.id,
            printer_id:item.printer_id,
            category_id:item.category_id,
            out_of_stock:item.out_of_stock,
            description:item.description
        })
        return data
    },

    Delete: async (item:ItemEntity) => {
        const {data} = await axiosClient().delete<BaseResponse<undefined>>(`item/${item.id}`)
        return data
    },

} 

const mappImage = (items:ItemEntity[]):ItemEntity[] => {
    
    return items.map((item,index) =>{
        return {...item,imgSrc:menuDataArray.at(index)?.imgSrc ?? "",quantity:1}
    })

}