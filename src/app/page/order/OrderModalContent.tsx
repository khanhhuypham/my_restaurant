import React, { useEffect, useState } from 'react';

import { Input, Button, Row, Col, Modal, Typography, Space, theme, InputNumber, Radio, Form } from 'antd';
import { PlusOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { CustomOption, MenuItem } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { cartSelector, setCart } from '../../store/cart/cartSlice';
import { ItemEntity } from '../../models/Item/Item';
import { validateHeaderName } from 'http';

const { TextArea } = Input;


export const OrderModalContent = ({
    item,
    onConfirm,
    onClose,
}: {
    item: ItemEntity;
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    // const { token: { colorPrimary }, } = theme.useToken();
    const [data, setData] = useState<ItemEntity>(new ItemEntity());
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleChangeQuantity = (quantity: number) => {

        if (quantity <= 0) {
            quantity = 0
        } else if (quantity >= 999) {
            quantity = 999
        }

        setData({ ...data, quantity: quantity })

    }


    const renderOption = (title: string, options: CustomOption[]) => {
        return (
            <>
                <div className='flex flex-col justify-start space-y-2'>
                    <h1 className="font-bold text-xl">{title}</h1>
                    <span>Required | Select 1 option: </span>
                    <Radio.Group className='grid grid-cols-3 gap-y-4'>
                        {options.map((option) => {
                            const price = (option.price !== null && option.price !== undefined) ? (" $" + option.price) : "";
                            return (
                                <Radio value={option.id}> {option.name + price} </Radio>
                            );
                        })}
                    </Radio.Group>
                </div>

                <hr className="solid"></hr>
            </>
        )
    }


    const onFinish = (values: ItemEntity) => {

        if (item.quantity >= 0) {
            dispatch(setCart({ ...data, ...values }))
            { onConfirm && onConfirm() }
        }
    };


    useEffect(() => {
        form.resetFields()

        form.setFieldsValue({
            name: item.name,
            description: item.description,
            note: item.note
        });

        setData(item)

    }, [item]);

    return (

        <Form
            form={form}
            onFinish={onFinish}
            name="dependencies"
            autoComplete="off"
            layout="vertical">

            <div>
                <img
                    className="w-[100%] h-[175px] overflow-hidden border-b-4 border-[#A71316] object-cover rounded-t-lg"
                    alt={""}
                    src={item.imgSrc}
                />
            </div>

            <div className="space-y-4 pt-6 px-6">

                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-4xl">{data.name}</p>
                        {
                            item.children.map((child) => {
                                return (
                                    <p className='text-xs '>
                                        <span>{child.name}</span>
                                        <span> x 1</span>
                                    </p>
                            )})
                        }
                    </div>

                    <p className="font-bold text-md h-max">{data.description}</p>


                </div>

                <hr className="solid"></hr>

                <div className='flex justify-start items-center gap-14'>
                    <Form.Item label={<h1 className="text-xl font-semibold">Quantity</h1>}>
                        <div className='flex rounded-lg'>
                            <Button
                                className='rounded-none rounded-l-md'
                                icon={<MinusOutlined />}
                                onClick={() => handleChangeQuantity(data.quantity - 1)}
                            />
                            <Input

                                value={data.quantity}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeQuantity(Number(e.target.value))
                                }}
                                className="rounded-none w-14 text-center"
                                type='number'
                            />
                            <Button
                                className='rounded-none rounded-r-md'
                                icon={<PlusOutlined />}
                                onClick={() => handleChangeQuantity(data.quantity + 1)}
                            />

                        </div>
                    </Form.Item>
                    <span className='text-xl font-semibold'>${data.quantity * data.price}</span>




                </div>

                <hr className="solid"></hr>

                <Form.Item name="note" label={<h1 className="text-xl font-semibold">Note</h1>}>
                    <TextArea
                        rows={2}
                        placeholder="Please enter your note before place order"
                        value={data.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setData({ ...data, description: e.target.value })
                        }}
                    />
                </Form.Item>
                <hr className="solid"></hr>

            </div>

            <Form.Item className="w-full h-20 flex justify-end items-center">
                <Button type="primary" htmlType="submit" className="font-bold mr-4 bg-red-700">
                    Add to cart
                </Button>
            </Form.Item>

        </Form>
    );
};
