import { Card, List } from "antd";
import lineImg from "../../assets/images/line.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import { MenuItem } from "../../../types";
import { cartSelector } from "../../store/cart/cartSlice";
import { PhoneFilled, EnvironmentFilled } from "@ant-design/icons";
import { ItemEntity } from "../../models/Item/Item";

export const Payment = () => {
    const [data, setData] = useState<ItemEntity[]>([]);
    const dispatch = useAppDispatch();
    const cardSlice = useAppSelector(cartSelector);

    useEffect(() => {
        setData(cardSlice.items);
    }, []);

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h1 className="text-center font-bold text-3xl">CHECKOUT</h1>
                <img className="h-6 flex m-auto" alt="line" src={lineImg} />
            </div>

            <div className="grid grid-cols-2 justify-center">
                <div className="flex flex-col items-end">
                    <Card className="drop-shadow-md" style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>

                    <Card className="drop-shadow-md" style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>


                <Card
                    className="drop-shadow-md"
                    style={{ width: 300 }}
                    bodyStyle={{ padding: "0" }}
                    bordered={false}
                >
                    <h1 className="p-4 text-2xl font-bold">Order Details</h1>

                    <div className="space-y-4 p-0">
                        <hr className="solid" />
                        <div className="px-5">
                            <div className="text-xl font-semibold">
                                New Chopstix Restaurant
                            </div>
                            <div>
                                <EnvironmentFilled className="text-red-700" />{" "}
                                123 Fake Street, Hayward, CA 94544
                            </div>
                            <div>
                                <PhoneFilled className="text-red-700" /> (510)
                                555-1234
                            </div>
                        </div>
                        <hr className="solid" />
                    </div>
                    <List
                        className="rounded-none"
                        dataSource={data}
                        size="large"
                        bordered
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className=" w-full">
                                    <div className="font-medium flex justify-between items-center">
                                        <span className="text-lg">
                                            {item.name}
                                        </span>
                                        <span className="text-md">
                                            ${item.price}
                                        </span>
                                    </div>

                                    <div>Note:asdasdas</div>

                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </List.Item>
                        )}
                    />

                    <div className="flex flex-col p-4 ">
                        <span className="text-lg font-semibold">
                            Subtotal: ${data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)}
                        </span>

                        <span className="text-md font-normal">
                            Tax (10.75%): $4.30
                        </span>
                    </div>

                    <hr className="solid" />
                    <div className="p-4">
                        <span className="text-lg font-semibold">
                            Total: ${data.map((item) => Number(item.price) * Number(item.quantity)).reduce((acc, curr) => acc + curr, 0)}
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
};
