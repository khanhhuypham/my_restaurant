import { useEffect, useState } from "react";

import { Anchor, Button, Card, Modal, Space, Typography } from "antd";
import {CloseCircleOutlined } from '@ant-design/icons';
import { ItemEntity } from "../../models/Item/Item";
import { menuDataArray } from "../../assets/menuData";
import { MenuItem } from "../../../types";
import lineImg from '../../assets/images/line.png';
import { OrderModalContent } from "./OrderModalContent";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../hooks/useRedux";
import { cartSelector } from "../../store/cart/cartSlice";


export const Order = () => {
    const [data, setData] = useState<ItemEntity[]>([]);
    const cardSlice = useAppSelector(cartSelector);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const showModalCreate = (item:MenuItem) => {
        let input = item

        const existingItem:MenuItem | undefined = cardSlice.items.find((element) => element.id == item.id)

        if (existingItem !== undefined){
            input = existingItem
        }

        let component = <OrderModalContent item={input} onConfirm={() => setDialog([false, undefined])}/>
        setDialog([true, component])
    }

    useEffect(() => {

    }, []);

    const isScreenXXSCustom = useMediaQuery({maxWidth: 400});


    return (
        <>

            <div className="flex pl-[10%] pr-[15%]">
                <Anchor
                    offsetTop={75}
                    targetOffset={125}
                    items={navMenuItems}
                />

                <div className="space-y-16">
                    {navMenuItems.map((navItem) => {
                        return (
                            <div id={navItem.key} key={navItem.key} className="space-y-10">

                                <div className="space-y-2">
                                    <h1 className="text-center font-bold text-3xl">
                                        {navItem.title}
                                    </h1>
                                    <img
                                        className="h-6 flex m-auto"
                                        alt="line"
                                        src={lineImg}
                                    />

                                </div>

                                <div className="grid grid-cols-3 gap-x-0 gap-y-8 justify-items-center">

                                    {menuDataArray.filter((item: MenuItem) => item.category === navItem.key).map((item: MenuItem) => {
                                        return (
                                            <Card

                                                className="w-[90%] drop-shadow-md"
                                                cover={<img alt={item.name} src={item.imgSrc} />}
                                                styles={{
                                                    cover: {
                                                        borderBottom: `#A71316 6px solid`
                                                    }
                                                }}
                                                onClick={() => showModalCreate(item)}
                                            >
                                                <h1 className="text-xl font-semibold">{item.name}</h1>
                                                {item.price !== "0.00" && (
                                                    <p className="font-medium">
                                                        {"$" + item.price}
                                                    </p>
                                                )}
                                            </Card>
                                        )
                                    })}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            <Modal
             
                styles={{
                    content: { padding: 0 }, 
                }}

                width={800}
                footer={false}
                closeIcon={<CloseCircleOutlined className="text-white"/>}
                open={dialog[0]}
                onCancel={() => setDialog([false, undefined])}
            >
                {dialog[1] ?? <></>}
            </Modal>

        </>

    );
};


const navMenuItems = [
    {
        key: 'appetizers',
        href: '#appetizers',
        title: <p className="font-semibold text-lg">APPETIZERS</p>
    },
    {
        key: 'soups',
        href: '#soups',
        title: <p className="font-semibold text-lg">SOUPS</p>
    },
    {
        key: 'main-entree',
        href: '#main-entree',
        title: <p className="font-semibold text-lg">MAIN ENTREÉS</p>
    },
    {
        key: 'bowls',
        href: '#bowls',
        title: <p className="font-semibold text-lg">ALL DAY RICE BOWLS</p>
    },
    {
        key: 'fried-rice-noodles',
        href: '#fried-rice-noodles',
        title: <p className="font-semibold text-lg">FRIED RICE & NOODLES</p>
    },
    {
        key: 'side-orders',
        href: '#side-orders',
        title: <p className="font-semibold text-lg">SIDE ORDERS</p>
    },
    {
        key: 'beverages',
        href: '#beverages',
        title: <p className="font-semibold text-lg">BEVERAGES</p>
    },
];

