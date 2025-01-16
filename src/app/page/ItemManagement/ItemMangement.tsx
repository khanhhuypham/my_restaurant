import { useEffect, useState } from "react";
import { Pagination as pageModel } from '../../models/pagination';
import { Button, Input, message, Modal, Pagination, PaginationProps, Select, Table, Tabs, TabsProps, Tag, Tooltip } from "antd";

import { ContentOfModalConfirm } from "../../component/modal/ModalConfirm";
import { useDebounce } from "../../utils/utils";
import { ColumnsType, TableProps } from "antd/es/table";
import { ItemEntity, ItemEntityPage } from "../../models/item/item";
import { ItemService } from "../../services/item/ItemService";


import { ChidlrenItem } from "../../models/item/item-children";
import { categoryService } from "../../services/category/categoryService";
import { Category } from "../../models/category/category";
import { CreateItem } from "./component/CreateItem";
import { cate_tabs, CATEGORY_TYPE } from "../../constants/enum/CATEGORY_TYPE";
import { ItemManagementTable } from "./component/ItemManagementTable";
import { PopupInterface } from "../../constants/interface/popup-interface";
import { pageSize } from "../../constants/constant";


export interface ItemListProps {
    data?: ItemEntity[]
    page: number
    limit: number
    total_record?: number
    loading?: boolean,
    category_id?: number | undefined,
    category_type?: number | undefined,
    out_of_stock?: boolean | undefined,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: ItemEntity) => void)
    onChangeStatus?: ((arg0: ItemEntity) => void)
    onShowDetail?: ((arg0: ItemEntity) => void)
}


export const ItemManagement = () => {

    const [parameter, setParameter] = useState<ItemListProps>({
        data: [],
        loading: false,
        limit: pageSize[0],
        page: 1,
        total_record: 0,
        search_key: "",
        category_id: undefined,
        category_type: CATEGORY_TYPE.food
    });

    const [showFilter, setShowFilter] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const debounceValue = useDebounce(parameter.search_key ?? "", 800);

    const fetchData = (param: ItemListProps) => {

        ItemService.List(param).then((res) => {
            if (res.status == 200) {
                setParameter({
                    ...param,
                    loading: false,
                    data: res.data.list,
                    total_record: res.data.total_record
                });
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    const getCategories = (type: CATEGORY_TYPE) => {

        categoryService.List(type).then((res) => {
            if (res.status == 200) {
                setCategories(res.data);
                onParamChange({ ...parameter, category_type: type })
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });
    };



    const showModalCreate = (data: ItemEntity) => {
        let component = <CreateItem
            item={data}
            category_type={parameter.category_type ?? CATEGORY_TYPE.food}
            onConfirm={() => {
                onParamChange(parameter)
                setDialog({ ...dialog, open: false })
            }}
            onClose={() => setDialog({ ...dialog, open: false })}
        />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: ItemEntity) => {
        let content = <ContentOfModalConfirm
            onClose={() => { setDialog({ ...dialog, open: false }) }}
            onConfirm={() => {
                ItemService.Delete(data).then((res) => {
                    if (res.status == 200) {
                        message.success("delete successfully")
                        onParamChange(parameter)
                        setDialog({ ...dialog, open: false });
                    } else {
                        message.error(res.message)
                    }
                }).catch((error) => {
                    message.error(error)
                })
            }}
            content={<p>Are you sure you want to remove this item</p>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }

    const onParamChange = (p: ItemListProps) => {
        setParameter({ ...p, loading: true });
        fetchData(p)
    }

    useEffect(() => {
        getCategories(parameter.category_type ?? CATEGORY_TYPE.food)
    }, [])

    useEffect(() => {
        onParamChange(parameter)
    }, [debounceValue])

    const Header = () => {
        return (
            <div>
                <div className="flex space-x-2">
                    {showFilter &&
                        <>
                            <Input
                                placeholder="default size"
                                className="w-64"
                                prefix={<i className="fa-solid fa-magnifying-glass" />}
                                allowClear
                                onChange={(e) => {
                                    onParamChange({ ...parameter, page: 1, search_key: e.target.value ?? "" })
                                }}
                            />

                            <Select
                                placeholder={<span className='text-black'>All Category</span>}
                                style={{ width: 200 }}
                                allowClear
                                onChange={(value) => {
                                    let category_id: number | undefined = Number(value)
                                    if (isNaN(category_id)) {
                                        category_id = undefined
                                    }
                                    onParamChange({ ...parameter, category_id: category_id, page: 1 })
                                }}

                                options={categories.map((cate) => ({ label: cate.name, value: cate.id }))}

                            />
                        </>
                    }

                    <Button
                        variant="outlined"
                        icon={<i className="fa-solid fa-plus" />}
                        className='h-max'
                        onClick={() => showModalCreate(new ItemEntity({category_type:parameter.category_type}))}
                    >
                        Create
                    </Button>

                </div>

            </div>
        )
    };



    return (
        <>
            <Tabs defaultActiveKey="1" items={cate_tabs()} onChange={(key: string) => {
                const category_type = Number(key)
                switch (category_type) {
                    case CATEGORY_TYPE.food:
                        setShowFilter(true)
                        getCategories(CATEGORY_TYPE.food)
                        break

                    case CATEGORY_TYPE.drink:
                        setShowFilter(true)
                        getCategories(CATEGORY_TYPE.drink)
                        break

                    default:
                        getCategories(category_type)
                        setShowFilter(false)
                        break
                }

            }}/>

            <Header/>

            <ItemManagementTable
                data={parameter.data}
                page={parameter.page}
                limit={parameter.limit}
                total_record={parameter.total_record}
                loading={parameter.loading}
                onPageChange={(page) => {
                    onParamChange({ ...parameter, page });
                }}
                onEdit={(value) => showModalCreate(value)}
                onChangeStatus={(value) => showModalConfirm(value)}
            />

            <Modal
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
                width={800}
            >
                {dialog.content ?? <></>}
            </Modal>
        </>
    );
};
