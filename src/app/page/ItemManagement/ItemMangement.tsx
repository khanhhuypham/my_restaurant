import { useEffect, useState } from "react";
import { Pagination as pageModel } from '../../models/pagination';
import { Button, Input, message, Modal, Pagination, PaginationProps, Select, Table, Tabs, Tag, Tooltip } from "antd";

import { ContentOfModalConfirm } from "../../component/modal/ModalConfirm";
import { useDebounce } from "../../utils/utils";
import { ColumnsType, TableProps } from "antd/es/table";
import { ItemEntity, ItemEntityPage } from "../../models/Item/item";
import { ItemService } from "../../services/item/ItemService";
import { CreateItem } from "./CreateItem";

import { ChidlrenItem } from "../../models/Item/item-children";
import { categoryService } from "../../services/category/categoryService";
import { Category } from "../../models/category/category";

export const ItemManagement = () => {

    const [data, setData] = useState<ItemEntityPage>(new ItemEntityPage());
    const [categories, setCategories] = useState<Category[]>([]);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);
    const [loading, setLoading] = useState(false);
    const [parameter, setParameter] = useState({
        pagination: { ...(new pageModel()), limit: 10, page: 1 },
        category_id: -1
    });
    const debounceValue = useDebounce(parameter.pagination.search_key, 800);

    const columns: ColumnsType<ItemEntity> = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            render: (record, _, index) => (parameter.pagination.page - 1) * parameter.pagination.limit + (index + 1),
            width: 30,
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (i, { name, out_of_stock }) => {
                return (
                    <div className={out_of_stock ? "text-red-600" : ""}>
                        <span>{name}</span>
                        {out_of_stock ? <i className="fa-solid fa-store-slash"></i> : <></>}
                    </div>
                )
            },
        },


        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 80,
        },


        {
            title: 'Unit',
            dataIndex: 'unit_type',
            key: 'unit_type',
        },

        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
         
        },

        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
        },

        {
            title: 'Updated at',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 150,
        },

        {
            title: 'Children items',
            dataIndex: 'children',
            key: 'children',
            render: (i, { children }) => {

                return (
                    <Tooltip placement="right" title={toolTipTable(children)} arrow={false} color="white" className="space-x-2">

                        <Tag bordered={false} color="processing">
                            {children.length}
                        </Tag>
                    </Tooltip>
                )
            }
        },


        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (i, row) => (
                // {row.status == user_status.INACTIVE && disabled}
                <div className="">


                    <Button onClick={() => {

                    }} type="text">
                        <i className="fa-solid fa-eye"></i>
                    </Button>

                    <Button onClick={() => showModalCreate(row)} type="text">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    
                    <Button type="text" danger onClick={() => showModalConfirm(row)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </div>
            )
        },

    ];


    // const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let p = { ...parameter.pagination, seach_key: e.target.value }
    //     setParameter({ ...parameter, pagination: p });
    // }


    const fetchData = () => {

        setLoading(true);

        ItemService.List(parameter).then((res) => {

            setLoading(false);

            if (res.status == 200) {
                console.log(res.data)
                setData(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    const onPageChange: PaginationProps['onChange'] = (page) => {
        let p = { ...parameter.pagination, page: page }
        setParameter({ ...parameter, pagination: p });
    };


    const showModalCreate = (data: ItemEntity) => {

        let component = <CreateItem
            item={data}
            onConfirm={() => {
                fetchData()
                setDialog([false, undefined])
            }}
            onClose={() => setDialog([false, undefined])}
        />
        setDialog([true, component])
    }

    const showModalConfirm = (data: ItemEntity) => {
        let content = <ContentOfModalConfirm
            onClose={() => { setDialog([false]); }} 
            onConfirm={() => {
                ItemService.Delete(data).then((res) =>{
                    if (res.status == 200) {
                        message.success("delete successfully")
                        fetchData()
                        setDialog([false]);
                    } else {
                        message.error(res.message)
                    }
                }).catch((error) =>{
                    message.error(error)
                })
            }}
            content={<p>Are you sure you want to remove this item</p>}
        />
        setDialog([true, content])
    }



    const header = () => {
        return (
            <div>

                <div className="flex space-x-2">

                    <Input

                        placeholder="default size"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            let p = { ...parameter.pagination, search_key: e.target.value ?? "", page: 1 }
                            setParameter({ ...parameter, pagination: p })
                        }}
                    />

                    <Select
                        placeholder={<span className='text-black'>All Category</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, category_id: Number(value ?? -1), pagination: p })
                        }}

                        options={categories.map((cate) => ({ label: cate.name, value: cate.id }))}

                    />

                    <Button
                        variant="outlined"
                        icon={<i className="fa-solid fa-plus" />}
                        className='h-max'
                        onClick={() => showModalCreate(new ItemEntity())}
                    >
                        Create
                    </Button>

                    {/* <Select
                        placeholder={<span className='text-black'>Source</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            console.log(value)
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, lead_source_id: Number(value ?? -1), pagination: p })

                        }}

                        options={customerSource.map((s) => ({ label: s.name, value: s.id }))}

                    /> */}


                </div>

            </div>
        )
    };


    useEffect(fetchData, [
        parameter.pagination.page,
        parameter.category_id,
        debounceValue
    ]);

    useEffect(() => {
        categoryService.List().then((res) => {
            if (res.status == 200) {
                setCategories(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });


        // ItemService.CustomerSourceList().then((res) => {

        //     if (res.status == 200) {
        //         setCustomerSource(res.data);
        //     } else {
        //         message.error(res.message)
        //     }

        // }).catch((error) => {
        //     console.log(error);
        // });


    }, []);




    return (
        <>
            {header()}
            <Table<ItemEntity>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data?.list}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={parameter.pagination.page} onChange={onPageChange} total={data?.total_record} />}
                expandable={{
                    showExpandColumn: false,
                }}
            />

            <Modal
                centered
                open={dialog[0]}
                onCancel={() => setDialog([false, undefined])}
                footer={<></>}
            >
                {dialog[1] ?? <></>}
            </Modal>
        </>
    );
};


const toolTipTable = (children: ChidlrenItem[]) => {


    const columnsOfToolTipTable: TableProps<ChidlrenItem>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, row, index) => name,
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price, row, index) => price,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, row, index) => quantity,
        },
    ];

    return (
        <Table<ChidlrenItem>
            columns={columnsOfToolTipTable}
            dataSource={children}
            size="small"
            showHeader={false}
            pagination={false}
        />
    )
}


