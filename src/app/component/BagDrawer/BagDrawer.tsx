
import { Button, Card, Drawer, DrawerProps, Input, InputNumber, List, Select, Space } from "antd";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import {
    PhoneFilled,
    EnvironmentFilled,
    CloseOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { MenuItem } from "../../../types";
import { removeItemFromCart } from "../../store/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { ROUTE_LINK } from "../../routes/route-link";
import { ItemEntity } from "../../models/Item/Item";


export const BagDrawer = (
    { openDrawer, setOpenDrawer, input }:
    {
        openDrawer: boolean;
        setOpenDrawer: Dispatch<SetStateAction<boolean>>;
        input: ItemEntity[]
    }
) => {
    const [data, setData] = useState<ItemEntity[]>([])

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const closeDrawer = () => {
        setOpenDrawer(false);
    };


    const renderDrawerTitle = (
        <div className="flex items-center justify-between">
            <span className="font-bold text-xl">My Bag</span>
            <Button
                aria-label="close-drawer-button"
                shape="circle"
                size="large"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
            />
        </div>
    );

    const renderListHeader = (
        <div className="space-y-4 p-0">
            <hr className="solid" />
            <div className="px-5">
                <div className="text-xl font-semibold">
                    New Chopstix Restaurant
                </div>
                <div>
                    <EnvironmentFilled className="text-red-700" /> 123 Fake
                    Street, Hayward, CA 94544
                </div>
                <div>
                    <PhoneFilled className="text-red-700" /> (510) 555-1234
                </div>
            </div>
            <hr className="solid" />
        </div>
    );

    const renderCostFooter = (
        <div >
            <div className="flex flex-col p-4 ">
                <span className="text-lg font-semibold">
                    Subtotal: ${data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}
                </span>


                <span className="text-md font-normal">
                    Tax (10.75%): $4.30
                </span>

            </div>

            <hr className="solid" />
            <div className="p-4">
                <span className="text-lg font-semibold">
                    Total: ${data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}
                </span>
            </div>


            <div >
                <Button
                    className="rounded-none font-bold bg-red-700"
                    block
                    type="primary"
                    size="large"
                    onClick={() => {
                        navigate(ROUTE_LINK.PAYMENT)
                    }}
                >
                    CHECKOUT
                </Button>
            </div>
        </div>
    );

    const renderBtnChangeQuantity = (item: ItemEntity) => {

        return (
            <div className="flex space-x-2">

                <div className='flex rounded-lg'>
                    <Button
                        className='rounded-none rounded-l-md'
                        icon={<MinusOutlined />}
                        onClick={() => {

                            let cloneData = data.map(element => {
                                
                                if (item.id === element.id) {
                                    let quantity = element.quantity - 1
                                    quantity = quantity <= 0 ? 0 : quantity

                                    return { ...element, quantity: quantity }; // Create a new object with updated quantity
                                } else {
                                    return element; // Return the original item if it's not the one to update
                                }
                            });
                            setData(cloneData)
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            let cloneData = data.map(element => {
                                if (item.id === element.id) {
                                    let quantity = Number(e.target.value)
                                    quantity = quantity >= 999 ? 999 : quantity
                                    return { ...element, quantity: quantity }; // Create a new object with updated quantity
                                } else {
                                    return element; // Return the original item if it's not the one to update
                                }
                            });
                            setData(cloneData)
                        }}
                        value={item.quantity}
                        type="number"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center w-14 rounded-none"
                    />
                    <Button
                        className='rounded-none rounded-r-md'
                        icon={<PlusOutlined />}
                        onClick={() => {

                            let cloneData = data.map(element => {
                                if (item.id === element.id) {
                                    let quantity = element.quantity + 1
                                    quantity = quantity >= 999 ? 999 : quantity
                                    return { ...element, quantity: quantity }; // Create a new object with updated quantity
                                } else {
                                    return element; // Return the original item if it's not the one to update
                                }
                            });
                            setData(cloneData)
                        }}
                    />

                </div>

                <Button
                    type="text"
                    onClick={() => {
                        dispatch(removeItemFromCart(item))
                    }}
                >
                    Remove
                </Button>
            </div>
        );
    }


    useEffect(() => {
        setData(input)
    }, [input])

   


    return (

        <Drawer
            closable={false}
            title={renderDrawerTitle}
            styles={{
                header: {},
                body: {
                    padding: "0px",
                },
            }}
            placement="right"
            onClose={closeDrawer}
            open={openDrawer}
        >
            <div className="h-full flex flex-col">
                <div className="flex-none">
                    {renderListHeader}
                </div>

                <List
                    className="flex-1"
                    dataSource={data}
                    size="large"
                    bordered
                    renderItem={(item, index) => (
                        <List.Item>
                            <div className=" w-full">

                                <div className="font-medium flex justify-between items-center">
                                    <span className="text-lg">{item.name}</span>
                                    <span className="text-md">${item.price}</span>
                                </div>


                                {
                                    item.note && (
                                        <div>Note:{item.note}</div>
                                    )
                                }
                                
    
                                {renderBtnChangeQuantity(item)}
                            </div>
                        </List.Item>
                    )}
                />

                <div className="flex-none">
                    {renderCostFooter}
                </div>

            </div>

        </Drawer>

    );
};




