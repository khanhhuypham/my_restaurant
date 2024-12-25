

import { BaseResponse } from "../../models/base-response"
import axiosClient from "../configURL"
import { ItemEntity, ItemEntityPage } from "../../models/item/item"
import { Pagination } from "../../models/pagination"
import { ChidlrenItem } from "../../models/item/item-children"
import { Unit } from "../../models/unit/unit"

import { menuDataArray } from "../../assets/menuData"
import { ItemListProps } from "../../page/ItemManagement/ItemMangement"

export const ItemService = {
	
    List: async (param:ItemListProps) => {
        const {data} = await axiosClient().get<BaseResponse<ItemEntityPage>>(`item`,{
            params: {
                category_type:param.category_type,
                category_id:param.category_id,
                out_of_stock:false,
                search_key:param.search_key,
                page:param.page,
                limit:param.limit,
            },
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



    // Detail: async (id:number) => {
    //     const {data} = await axiosClient().get<BaseResponse<Department>>(`v1/departments/${id}/detail`)
    //     return data
    // },

   
  
    Update: async (item:ItemEntity) => {
        console.log(item.description)
        const {data} = await axiosClient().put<BaseResponse<undefined>>(`item/${item.id}`,{
            name:item.name,
            price:item.price,
            children:item.children.map((child) =>({id:child.id, quantity:0})),
            unit_id:item.unit_id,
            printer_id:item.printer_id,
            category_id:item.category_id,
            out_of_stock: item.out_of_stock,
            sell_by_weight:item.sell_by_weight,
            description:item.description
        })
        return data
    },

    Create: async (item:ItemEntity) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`item`,{
            name:item.name,
            price:item.price,
            children:item.children.map((child) =>({id:child.id, quantity:0})),
            unit_id:item.unit_id,
            printer_id:item.printer_id,
            category_id:item.category_id,
            out_of_stock:item.out_of_stock,
            sell_by_weight:item.sell_by_weight,
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
        return {...item,image:menuDataArray.at(index)?.imgSrc ?? "",quantity:1}
    })

}