import { Button, Card, List } from "antd";
import lineImg from "../../assets/images/line.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import { MenuItem } from "../../../types";
import { addItem, cartSelector } from "../../store/cart/cartSlice";
import { PhoneFilled, EnvironmentFilled } from "@ant-design/icons";
import { ItemEntity } from "../../models/Item/Item";
import TextArea from "antd/es/input/TextArea";
import { QuantityBtnGroup } from "../../component/Button/ButtonGroup";
import { CalendarBtn } from "../../component/Button/CalendarBtn";

export const Payment = () => {
    const [data, setData] = useState<ItemEntity[]>([]);
    const dispatch = useAppDispatch();
    const cardSlice = useAppSelector(cartSelector);

    useEffect(() => {
        setData(cardSlice.items);
    }, [cardSlice.items]);

    return (
        <div className="space-y-12 bg-white h-full pl-[200px] pr-[70px]">
            <div className="space-y-2">
                <h1 className="text-start font-bold text-xl">CHECKOUT</h1>
                <hr className="bg-gray-700 h-[1.5px]" />
            </div>

            <div className="flex justify-around gap-20">
                <div className="space-y-[20px] ">

                    <div className="space-y-[30px]">
                        <div className="space-x-2 text-xl font-semibold">
                            <i className="fa-solid fa-location-dot text-orange-500"></i>
                            <span>Delivery address</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <Card className="bg-orange-500 text-white">
                                <i className="fa-solid fa-location-dot text-xl"></i>
                                <p>  Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telangana</p>
                            </Card>
                            <Card className="border-dashed border-2 border-orange-500">
                                <i className="fa-solid fa-location-dot text-xl"></i>
                                <p>  Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telangana</p>
                            </Card>
                        </div>

                    </div>


                    <div className="space-y-[30px]">
                        <div className="space-x-2 text-xl font-semibold">
                            <i className="fa-solid fa-location-dot text-orange-500"></i>
                            <span>Type of order</span>
                        </div>
                        <div className="flex justify-start gap-6">


                            <div className="bg-orange-500 text-white space-x-2 py-2 px-3.5 rounded-md">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Subscription</span>
                            </div>



                            <div className="border-dashed border-[2px] border-orange-500 space-x-2 py-2 px-3.5 rounded-md">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Schudle order</span>
                            </div>





                            <div className="border-dashed border-[2px] border-orange-500 space-x-2 py-2 px-3.5 rounded-md">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Order Now</span>
                            </div>







                        </div>
                    </div>


                    <div className="grid grid-cols-2 ">
                        <div className="space-y-[20px]">
                            <span className="text-md font-medium">
                                Type of subscription
                            </span>
                            <div className="flex justify-start gap-6">
                                <span className="pb-2 px-4 border-b-[1px] border-orange-500 text-orange-500">Monthly</span>
                                <span className="pb-2 px-4 border-b-[1px] border-black">Weekly</span>
                                <span className="pb-2 px-4 border-b-[1px] border-black">Custom</span>
                            </div>
                        </div>
                        <div className="space-y-[20px]">
                            <span className="text-md font-medium">
                                What's the plan?
                            </span>
                            <div className="flex justify-start gap-6">
                                <div className="border-solid border-[1px] border-orange-500 text-orange-500 py-2 px-3.5 rounded-md">
                                    <span>3-days/Week</span>
                                </div>

                                <div className="border-solid border-[1px] border-black py-2 px-3.5 rounded-md">
                                    <span>5-Days/Week</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-2">
                        <div className="space-y-[20px]">
                            <span className="text-md font-medium">
                                What time do you want us to deliver?
                            </span>
                            <div className="flex justify-start gap-6">


                                <CalendarBtn
                                    content={
                                        <div className="pb-2 px-4 border-b-[1px] border-black space-x-2 ">
                                            <i className="fa-regular fa-calendar"></i>
                                            <span>16:30</span>
                                        </div>
                                    }
                                    closure={() =>{
                                        
                                    }}

                                />
                                <span className="text-orange-500">24 hrs</span>

                            </div>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <span className="text-md font-medium">
                                Any Note for us?
                            </span>
                            <TextArea className="border-gray-300 border-[1.5px] w-64" rows={3} placeholder="Type you note here..." />
                        </div>
                    </div>

                </div>

                <div className="bg-zinc-100 p-4 space-y-[30px] rounded-md">

                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">Order Details</span>
                        <span className="font-medium"> {data.length} Items</span>
                    </div>

                    <List
                        className="rounded-none"
                        dataSource={data}
                        size="large"
                        style={{
                            height: 300,
                            overflow: "auto"
                        }}
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className=" w-full">
                                    <div className="font-bold flex justify-between items-center">
                                        <span className="text-xs">
                                            {item.name}
                                        </span>
                                        <span>
                                            ${item.price}
                                        </span>
                                    </div>

                                    {item.note && (<div>Note:{item.note}</div>)}

                                    <QuantityBtnGroup quantity={item.quantity} closure={(value: number) => {
                                        dispatch(addItem({ ...item, quantity: value }))
                                    }} />
                                </div>
                            </List.Item>
                        )}
                    />

                    <div className="flex flex-col space-y-[45px] text-[#808080]">

                        <div className="space-y-[15px]">
                            <span>Bill details</span>

                            <div className="flex justify-between">
                                <span>Item Total</span>
                                <span>799.00</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <span>Delivery free | 12..9 kms</span>
                                        <span>Custom Delivery time</span>
                                    </div>
                                    <i className="fa-regular fa-clock row-span-2"></i>
                                </div>

                                <span>131.00</span>
                            </div>


                            <div className="flex justify-between">
                                <span>Taxes and Charges <i className="fa-regular fa-clock row-span-2"></i></span>
                                <span>2.0</span>
                            </div>

                        </div>

                        <p className="font-bold text-black">Monthly + 3 Days/Week plan + 16:30 Delivery time</p>


                        <div className="space-y-[15px]">

                            <div className="flex justify-between">
                                <span>Total</span>
                                <span>11,400.00</span>
                            </div>


                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span>4000.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-2xl font-bold text-black">
                            <span>Total</span>
                            <span>{data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}</span>
                        </div>

                        <Button className="h-[50px] bg-[#FC8019] text-white font-bold text-lg">
                            Proceed To Payment
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    );
};
