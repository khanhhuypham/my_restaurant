import { Button, List } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import { addItem, cartSelector, charge, removeItemFromCart } from "../../store/cart/cartSlice";
import { ItemEntity } from "../../models/item/item";
import { QuantityBtnGroup } from "../../component/Button/ButtonGroup";
import { OrderType } from "../../constants/enum";



export const ProductOfCheckoutForm = () => {

       const [data, setData] = useState<ItemEntity[]>([]);

        const dispatch = useAppDispatch();

        const cardSlice = useAppSelector(cartSelector);
    
        const [option, setOption] = useState({
            order_type: OrderType.ORDER_NOW,
        });
    
        useEffect(() => {

            setData(cardSlice.items);
        }, [cardSlice.items]);
    return (
        <div className="bg-zinc-100 p-4 space-y-[30px] rounded-md w-min-64">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                    Order Details
                </span>
                <span className="font-medium">
                    {" "}
                    {data.length} Items
                </span>
            </div>

            <List

                className="rounded-none"
                dataSource={data}
                size="large"
                style={{
                    height: 300,
                    overflow: "auto",
                }}
                renderItem={(item, index) => (
                    <List.Item>
                        <div className="w-full space-y-2">


                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold">
                                    {item.name}
                                </span>
                                <span>${item.price}</span>
                            </div>

                            {item.note && <div>Note:{item.note}</div>}
                            <div className="flex justify-between items-center">
                                <QuantityBtnGroup
                                    quantity={item.quantity}
                                    closure={(value: number) => {
                                        dispatch(addItem({ ...item, quantity: value, }));
                                    }}
                                />
                                <Button variant="text" color="danger" onClick={() => {
                                    dispatch(removeItemFromCart(item))
                                }}>
                                    <i className="fa-solid fa-trash"></i>
                                </Button>

                            </div>


                            <div className="flex justify-start">

                                <span className="font-bold">${(item.price * item.quantity).toFixed(3)}</span>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

            <div className="flex flex-col space-y-[45px] text-[#808080]">
                <div className="space-y-[15px]">
                    <span>Bill details</span>

                    <div className="flex justify-between">
                        <span>Item Total</span>
                        <span>{data.length}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                            Taxes and Charges{" "}
                            <i className="fa-regular fa-clock row-span-2"></i>
                        </span>
                        <span>{data.map((item) => Number(2)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}</span>
                    </div>
                </div>

                <p className="font-bold text-black">
                    Monthly + 3 Days/Week plan + 16:30 Delivery time
                </p>

                <div className="space-y-[15px]">
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>{data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>4000.00</span>
                    </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-black">
                    <span>Total</span>
                    <span>
                        {data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0).toFixed(3)}
                    </span>
                </div>

                <Button className="h-[50px] bg-[#FC8019] text-white font-bold text-lg" onClick={() => {
                    dispatch(charge())
                }}>
                    Place order
                </Button>
            </div>
        </div>
    )
}