


import { BaseResponse } from "../../models/base-response"
import { Department } from "../../models/department"
import axiosClient from "../configURL"
import { ItemEntity, ItemEntityPage } from "../../models/Item/Item"
import { Pagination } from "../../models/pagination"
import { ChidlrenItem } from "../../models/Item/item-children"
import { Unit } from "../../models/unit/unit"
import { Printer } from "../../models/printer/Printer"


export const printerService = {

    List: async () => {
        const { data } = await axiosClient().get<BaseResponse<Printer[]>>(`printer`)
        return data
    },


    Update: async (printer: Printer) => {
        const { data } = await axiosClient().patch<BaseResponse<undefined>>(`printer/${printer.id}`, {
            name: printer.name,
            ip_address:  printer.ip_address,
            printer_name: printer.printer_name,
            port: printer.port,
            connection_type:  printer.connection_type,
            print_number: printer.print_number,
            is_print_each_paper: printer.is_print_each_paper,
            status: printer.status,
            type:  printer.type,
        })
        return data
    },

    Create: async (printer: Printer) => {
        const { data } = await axiosClient().post<BaseResponse<undefined>>(`printer`, {
            name: printer.name,
            ip_address:  printer.ip_address,
            printer_name: printer.printer_name,
            port: printer.port,
            connection_type:  printer.connection_type,
            print_number: printer.print_number,
            is_print_each_paper: printer.is_print_each_paper,
            status: printer.status,
            type:  printer.type,
        })
        return data
    },

    Delete: async (item: ItemEntity) => {
        const { data } = await axiosClient().delete<BaseResponse<undefined>>(`item/${item.id}`)
        return data
    },

} 