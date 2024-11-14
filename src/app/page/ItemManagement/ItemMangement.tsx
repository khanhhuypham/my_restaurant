import { useEffect, useState } from "react";
import { Pagination as pageModel } from '../../models/pagination';
import { Button, Input, message, Modal, Pagination, PaginationProps, Select, Table, Tabs, Tag, Tooltip } from "antd";

import { ContentOfModalConfirm } from "../../component/modal/ModalConfirm";
import { useDebounce } from "../../utils/utils";
import { ColumnsType, TableProps } from "antd/es/table";
import { ItemEntity, ItemEntityPage } from "../../models/Item/Item";
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
        pagination: { ...(new pageModel()), offset: 10, cursor: 1 },
        category_id: 0
    });
    const debounceValue = useDebounce(parameter.pagination.key_search, 800);

    const columns: ColumnsType<ItemEntity> = [
        {
            title: 'Order',
            dataIndex: '',
            render: (record, _, index) => (index + 1).toString(),
            width: 30,
        },

        {
            title: 'Name',
            dataIndex: 'name',
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
            width: 80,
        },


        {
            title: 'Unit',
            dataIndex: 'unit',
            render: (i, row) => {

                return <span className="">{row.unit?.name ?? ""}</span>
            }
        },

        {
            title: 'Category',
            dataIndex: 'Category',
            render: (i, { category }) => {

                return <span className="">{category?.name ?? ""}</span>
            }
        },

        {
            title: 'Created at',
            dataIndex: 'created_at',
            width: 150,
        },

        {
            title: 'Updated at',
            dataIndex: 'updated_at',
            width: 150,
        },

        {
            title: 'Children items',
            dataIndex: 'children',
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
            dataIndex: '',
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

                    <Button type="text" danger onClick={() => { }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </div>
            )
        },

    ];


    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    }


    const fetchData = () => {

        setLoading(true);

        ItemService.List(parameter.pagination).then((res) => {

            setLoading(false);

            if (res.status == 200) {
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
                ItemService.Update(data).then((res) => {

                    if (res.status == 200) {
                        message.success("Change Status successfully")
                        fetchData()
                    } else {
                        message.error(res.message)
                    }
                    setDialog([false])
                }).catch((error) => {
                    console.log(error)
                })
            }}
            content={<p>Are you sure you want to unenable this category</p>}
        />
        setDialog([true, content])
    }



    const header = () => {
        return (
            <div>
                <div className="flex justify-between">
                    <Tabs
                        defaultActiveKey="-1"
                        color="orange"
                        items={[{ text: "Khách chính thức", value: -1 }, { text: "Khách tiềm năng", value: 1 }].map((element, i) => {
                            return {
                                key: element.value.toString(),
                                label: (
                                    <div className="space-x-2">
                                        <span>{element.text}</span>
                                        <span className='text-[11px] p-1 bg-slate-200 rounded-full'>99+</span>
                                    </div>
                                ),
                            };
                        })}

                    />

                    <div>

                        <Button
                            color="danger"
                            variant="solid"
                            icon={<i className="fa-solid fa-plus"></i>}
                            className="text-base"

                        >
                            Add
                        </Button>

                    </div>
                </div>
                <div className="flex space-x-2">

                    <Input
                        placeholder="default size"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            let p = { ...parameter.pagination, key_search: e.target.value ?? "", page: 1 }
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
        parameter.pagination.cursor,
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
                footer={() => <Pagination align="end" current={parameter.pagination.cursor} onChange={onPageChange} total={data?.total_record} />}
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

