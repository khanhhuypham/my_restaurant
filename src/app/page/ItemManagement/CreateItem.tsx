

import { useState, useEffect } from "react";
import { departmentService } from "../../services/department/departmentService";

import { Department } from "../../models/department";
import { Button, Form, Input, InputNumber, message, Select, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Category } from "../../models/category/category";
import { categoryService } from "../../services/category/categoryService";
import { ItemEntity } from "../../models/Item/Item";
import { ItemService } from "../../services/item/ItemService";
import { Unit } from "../../models/unit/unit";
import { ChidlrenItem } from "../../models/Item/item-children";
import { time } from "console";

const { Option } = Select;




export const CreateItem = ({
    item,
    onConfirm,
    onClose,
}: {
    item: ItemEntity;
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    const [data, setData] = useState<ItemEntity>(new ItemEntity());
    const [categories, setCategories] = useState<Category[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [printers, setPrinters] = useState<string[]>([]);
    const [children, setChildren] = useState<ChidlrenItem[]>([]);

    const [form] = Form.useForm();

    const onFinish = (values: any) => {


        if (data.id == 0) {
            ItemService.Create(data).then((res) => {
                if (res.status == 200) {
                    message.success("update successfully")
                    { onConfirm && onConfirm() }
                } else {
                    message.error(res.message)
                }
            }).catch((error) => {
                console.log(error)

            })
        } else {
            ItemService.Update(data).then((res) => {
                if (res.status == 200) {
                    message.success("Update successfully")
                    { onConfirm && onConfirm() }
                } else {
                    message.error(res.message)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };


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

        ItemService.ListOfChilrenItem().then((res) => {
            if (res.status == 200) {
                setChildren(res.data);
            } else {
                message.error(res.message)
            }
        }).catch((error) => {
            console.log(error);
        });

        ItemService.ListOfUnit().then((res) => {
            if (res.status == 200) {
                setUnits(res.data);
            } else {
                message.error(res.message)
            }
        }).catch((error) => {
            console.log(error);
        });

    }, []);


    useEffect(() => {
        form.resetFields()

        form.setFieldsValue({
            name: item.name,
            price: item.price,
            children: item.children.map((child) => child.id),
            category: item.category?.id,
            unit: item.unit?.id,
            description: item.description
        });


        setData(item)

    }, [item]);

    return (
        <div>
            <h1 className="text-center font-bold text-2xl mb-6">{item.id == 0 ? "Create Item" : "Edit Item"}</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true },
                        { type: "string", min: 2 },
                    ]}
                    className="mb-3"
                >
                    <Input
                        placeholder="Enter..."
                        value={data.name}
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value })
                        }}
                    />
                </Form.Item>


                <Form.Item label="Price" name="price"
                    rules={[
                        { required: true, message: 'price is required' },
                        { type: "number" },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <div className="grid grid-cols-2 gap-x-4 flex items-center">

                    <Form.Item name="children" label="Children Item" className="mb-3">
                       
                        <Select 
                            placeholder="Select a option" 
                            mode="multiple"
                            options={children.map((child) =>({
                                label: child.name,
                                value: child.id
                            }))}

                            onChange={(value:number[]) => {
                                let list = children.filter((child) =>{
                                    return value.includes(child.id)
                                })
                                setData({ ...data, children:list })
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="category" label="Category" rules={[{ required: true }]} className="mb-3">
                        <Select 
                            placeholder="Select a option" 
                            options={categories.map((cate) =>({
                                label: cate.name,
                                value: cate.id
                            }))}
                            onChange={(value:number) => {
                                setData({ ...data, category: categories.find((cate) => cate.id == value) })
                            }}
                        />
                           
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-x-4 flex items-center">

                    <Form.Item name="printer" label="Printer" className="mb-3">
                        <Select placeholder="Select a option" allowClear >
                            {/* {customerSource.map((value, _) => <Option key={value.id} value={value.id}>{value.name}</Option>)} */}
                        </Select>
                    </Form.Item>

                    <Form.Item name="unit" label="Unit" className="mb-3">
                  
                        <Select 
                            placeholder="Select a option" 
                            allowClear 
                            options={units.map((unit) =>({
                                label: unit.name,
                                value: unit.id
                            }))}
                            onChange={(value:number) => {
                                setData({ ...data, unit: units.find((cate) => cate.id == value) })
                            }}
                        />
                    </Form.Item>
                </div>


                <Form.Item name="description" label="Description" className="mb-10">
                    <TextArea
                        rows={3}
                        placeholder="Description...."
                        value={data.description}
                        onChange={(e) => {
                            setData({ ...data, description: e.target.value })
                        }} />
                </Form.Item>

                <Form.Item>
                    <Space className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            {item.id == 0 ? "Add" : "Update"}
                        </Button>
                        <Button htmlType="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};