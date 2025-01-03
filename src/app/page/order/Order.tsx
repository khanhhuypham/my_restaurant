import { useEffect, useState } from "react";

import { Anchor, Button, Card, message, Modal, Space, Typography } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemEntity, ItemEntityPage } from "../../models/item/item";
import { menuDataArray } from "../../assets/menuData";
import { MenuItem } from "../../../types";
import lineImg from '../../assets/images/line.png';
import { OrderModalContent } from "./OrderModalContent";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { cartSelector, removeItemFromCart, addItem } from "../../store/cart/cartSlice";
import { categoryService } from "../../services/category/categoryService";
import { Category } from "../../models/category/category";
import { Pagination as pageModel } from '../../models/pagination';
import { ItemService } from "../../services/item/ItemService";
import { QuantityBtnGroup } from "../../component/Button/ButtonGroup";
import { OrderCard } from "./OrderCard";

interface navItem {
    key: number;
    href: string;
    title: JSX.Element;
}

export const Order = () => {
    const [data, setData] = useState<ItemEntityPage>(new ItemEntityPage());
    const [categories, setCategories] = useState<navItem[]>(navMenuItems);
    const cardSlice = useAppSelector(cartSelector);
    const dispatch = useAppDispatch();
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const [parameter, setParameter] = useState({
        pagination: { ...(new pageModel()), limit: 100, page: 1 },
        category_id: -1
    });


    const isItemExistingInStore = (item: ItemEntity): boolean => {
        let result = cardSlice.items.find((element) => element.id == item.id)
        return result === undefined ? false : true
    }


    // const updateItemInStore = (item: ItemEntity) => {
    //     let result = cardSlice.items.find((element) => element.id == item.id)

    //     if (result) {
    //         dispatch(setCart)
    //     }

       
    // }

    


    const showModalCreate = (item: ItemEntity) => {
        let input = item

        const existingItem: ItemEntity | undefined = cardSlice.items.find((element) => element.id == item.id)

        if (existingItem !== undefined) {
            input = existingItem
        }

        let component = <OrderModalContent item={input} onConfirm={() => setDialog([false, undefined])} />
        setDialog([true, component])
    }


    useEffect(() => {

        categoryService.List().then((res) => {

            const categoryList: navItem[] = res.data.map((element) => ({
                key: element.id,
                href: `#${element.id.toString()}`,
                title: <p className="font-semibold text-lg">{element.name}</p>
            }))
            setCategories(categoryList)
            console.log(categoryList)

        }).catch((error) => {
            console.log(error)
        })

        // ItemService.List(parameter).then((res) => {
          
        //     if (res.status == 200) {
        //         setData(res.data);
        //         console.log(data.list)
        //     } else {
        //         message.error(res.message)
        //     }

        // }).catch((error) => {
        //     console.log(error);
        // });

    }, []);



    return (
        <>

            <div className="flex pl-[10%] pr-[15%]">
                <Anchor
                    offsetTop={75}
                    targetOffset={125}
                    items={categories}
                />
                <div className="space-y-16">
                    {categories.map((cate) => {
                        return (
                            <div key={cate.key} className="space-y-10">

                                <div className="space-y-2">
                                    <h1 className="text-center font-bold text-3xl">
                                        {cate.title}
                                    </h1>
                                    <img
                                        className="h-6 flex m-auto"
                                        alt="line"
                                        src={lineImg}
                                    />

                                </div>

                                <div className="grid grid-cols-4 gap-x-0 gap-y-8 justify-items-center">
                                    {data.list
                                    .filter((item: ItemEntity) => item.category_id === cate.key)
                                    .map((item: ItemEntity) => {
                                        return   (
                                            <OrderCard
                                                key={item.id}
                                                item={item} 
                                                onClick={() => showModalCreate(item)}
                                            />
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
                closeIcon={<CloseCircleOutlined className="text-white" />}
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
        key: 5,
        href: '#fried-rice-noodles',
        title: <p className="font-semibold text-lg">FRIED RICE & NOODLES</p>
    },

];


