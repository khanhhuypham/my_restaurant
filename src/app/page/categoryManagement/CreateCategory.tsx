

import { useState, useEffect } from "react";

import { Button, Form, Input, message, Select, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Category } from "../../models/category/category";
import { categoryService } from "../../services/category/categoryService";

const { Option } = Select;




export const CreateCategory = ({
    category,
    onConfirm,
    onClose,
}: {
    category: Category;
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    const [data, setData] = useState<Category>(new Category());
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        
        console.log(data)
        if (data.id == 0) {
            categoryService.Create(data).then((res) => {
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
            categoryService.Update(data).then((res) => {
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
        form.resetFields()

        form.setFieldsValue({
            name: category.name,
            active: category.active,
            description: category.description
        });

        console.log(category)
        console.log(form.getFieldValue("active"))

        setData(category)

    }, [category]);

    return (
        <div>
            <h1 className="text-center font-bold text-2xl mb-6">{category.id == 0 ? "Create Department" : "Edit Department"}</h1>
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

                <Form.Item label="Status" name="active">
                    <Switch  onChange={(checked: boolean) => {
                         setData({ ...data, active: checked })
                    }}/>
                </Form.Item>

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
                            {category.id == 0 ? "Add" : "Update"}
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