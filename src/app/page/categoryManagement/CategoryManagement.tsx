import { useEffect, useState } from "react";
import { Category } from "../../models/category/category";
import { categoryService } from "../../services/category/categoryService";
import { Button, Input, message, Modal, Space, Table, TableProps, Tabs, Tag } from "antd";
import { CreateCategory } from "./CreateCategory";
import { ContentOfModalConfirm } from "../../component/modal/ModalConfirm";
import { containsDiacritics } from "../../utils/utils";

export const CategoryManagement = () => {

    const [fullData, setFullData] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);
    const [active, setActive] = useState<boolean>(true);
    

    const columns: TableProps<Category>['columns'] = [
        {
            title: 'Order',
            dataIndex: '',
            key: '',
            width: 10,
            render: (id, _, index) => <span>{index + 1}</span>,
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: '',
            key: '',
            render: (_, record) => (
                <Tag color="blue" key={1}>
                    ACTIVE
                </Tag>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 140,
        },
        {
            title: 'Updated Date',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: 140,
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">

                    <Button onClick={() => showModalConfirm(record)} type="text">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </Button>

                    <Button onClick={() => showModalCreate(record)} type="text">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>

                    {/* <Button type="text" danger onClick={() => showModalConfirm(record)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button> */}
                </Space>
            ),
        },
    ];

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let keySearch = e.target.value.toLowerCase()
        if (keySearch === "") {
            setCategories(fullData)
        } else {
            const departmentsFilter = fullData.filter((item) => {
                let name = item.name.toLowerCase()

                if (!containsDiacritics(keySearch)) {
                    name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    keySearch = keySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                }

                return name.includes(keySearch);
            })
            setCategories(departmentsFilter)
        }
    }

    const fetchData = () => {
        categoryService.List().then((res) => {
            console.log(res.data)
            setCategories(res.data.filter((cate) => cate.active === active));
            setFullData(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    const showModalCreate = (data: Category) => {

        let component = <CreateCategory
            category={data}
            onConfirm={() => {
                fetchData()
                setDialog([false, undefined])
            }}
            onClose={() => setDialog([false, undefined])}
        />
        setDialog([true, component])
    }

    const showModalConfirm = (data: Category) => {
        let content = <ContentOfModalConfirm
            onClose={() => { setDialog([false]); }}
            onConfirm={() => {
                categoryService.Update({...data,active:false}).then((res) => {

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


    useEffect(() => {
        fetchData()
    }, []);




    return (
        <div className="space-y-2">
            <div>
                <Tabs
                    defaultActiveKey="-1"
                    color="orange"
                    items={
                        [
                            { text:"Active",value:true, badge:fullData.filter((data)=>data.active = true).length},
                            { text:"InActive",value:false, badge:fullData.filter((data)=>data.active = false).length }
                        ].map((element, i) => {
                            return {
                                key: element.value.toString(),
                                label: (
                                    <div className="space-x-2">
                                        <span>{element.text}</span>
                                        <span className='text-[11px] p-1 bg-slate-200 rounded-full'>
                                            {element.badge}
                                        </span>
                                    </div>
                                ),
                            };
                        })
                    }

                    onChange={(value) => {
                        setActive(value.toLowerCase() === 'true')
                        setCategories(fullData.filter((cate) => cate.active === active))
                    }}
                />
            </div>

            <div className="flex space-x-2">
                <Input placeholder="default size" className="w-48 " prefix={<i className="fa-solid fa-magnifying-glass" />} onChange={onSearch} />
                <Button
                    variant="outlined"
                    icon={<i className="fa-solid fa-plus" />}
                    className='h-max'
                    onClick={() => showModalCreate(new Category())}
                >
                    Create
                </Button>
            </div>
            <Table<Category> columns={columns} dataSource={categories} />
            <Modal
                width={800}
                centered
                open={dialog[0]}
                onCancel={() => setDialog([false, undefined])}
                footer={<></>}
            >
                {dialog[1] ?? <></>}
            </Modal>
        </div>
    );
};


