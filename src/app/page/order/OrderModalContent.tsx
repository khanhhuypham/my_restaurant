import React, { useEffect, useState } from 'react';

import { Input, Button, Row, Col, Modal, Typography, Space, theme, InputNumber, Radio, Form } from 'antd';
import { PlusOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { CustomOption, MenuItem } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { cartSelector, setCart } from '../../store/cart/cartSlice';

const { TextArea } = Input;


export const OrderModalContent = ({
    item,
    onConfirm,
    onClose,
}: {
    item: MenuItem;
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    // const { token: { colorPrimary }, } = theme.useToken();
    const [quantity,setQuantity] = useState<number>(1)
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const handleChangeQuantity = (quantity: number) => {

        if (quantity <= 0){
            quantity = 0
        }


        form.setFieldValue("quantity", quantity)
        setQuantity(quantity)
        
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


    const onFinish = (values: MenuItem) => {
        console.log(values)
        if (quantity >= 0){
            dispatch(setCart({...item,...values}))
            {onConfirm && onConfirm()}
        }
    };


    useEffect(() => {
        form.resetFields()

        form.setFieldsValue({
            name: item.name,
            quantity: item.quantity,
            description: item.description,
            note: "huy"
        });
        setQuantity(item.quantity)

        
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

                <div className="space-y-1">
                    <Form.Item name="name" className='mb-0'>
                        <Input.TextArea className="font-bold text-4xl" readOnly={true} variant="borderless" autoSize={true} />
                    </Form.Item>

                    <Form.Item name="description" >
                        <Input.TextArea className="font-medium text-md h-max" readOnly={true} variant="borderless" autoSize={true} />
                    </Form.Item>
                </div>

                <hr className="solid"></hr>

                <div className='flex justify-start items-center gap-14'>
                    <Form.Item name="quantity" label={<h1 className="text-xl font-semibold">Quantity</h1>}>
                        <div className='flex rounded-lg'>
                            <Button
                                className='rounded-none rounded-l-md'
                                icon={<MinusOutlined />}
                                onClick={() => handleChangeQuantity(quantity - 1)}
                            />
                            <Input
                                onChange={(e) => { handleChangeQuantity(Number(e.target.value)) }}
                                value={quantity}
                                type="number"
                                className="rounded-none w-14 text-center"

                            />
                            <Button
                                className='rounded-none rounded-r-md'
                                icon={<PlusOutlined />}
                                onClick={() => handleChangeQuantity(quantity + 1)}
                            />

                        </div>
                    </Form.Item>
                </div>

                <hr className="solid"></hr>

                {
                    item.dumpling && renderOption("Dumpling Type", item.dumpling) ||
                    item.soup && renderOption("Soup Size", item.soup) ||
                    item.bowl && renderOption("Rice Choice", item.bowl) ||
                    item.protein && renderOption("Protein Choice", item.protein) ||
                    item.tea && renderOption("Tea Choice", item.tea) ||
                    item.coke && renderOption("Soda Choice", item.coke)
                }

                <Form.Item name="note" label={<h1 className="text-xl font-semibold">Note</h1>}>
                    <TextArea rows={2} placeholder="Food allergy? Need something put on the side? Let us know. (additional charges may apply and not all changes are possible)"/>
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
