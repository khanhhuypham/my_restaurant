import { useEffect, useState } from "react";

import { Anchor, Button, Card, message, Modal, Space, Typography } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemEntity, ItemEntityPage } from "../../models/Item/Item";
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
        pagination: { ...(new pageModel()), limit: 40, page: 1 },
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

        ItemService.List(parameter).then((res) => {
            if (res.status == 200) {
                setData(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });

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
                            <div id={cate.key.toString()} key={cate.key} className="space-y-10">

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

                                    {data.list.filter((item: ItemEntity) => item.category?.id === cate.key).map((item: ItemEntity) => {

                                        return (
                                            <Card
                                                hoverable
                                                className="w-[90%] drop-shadow-md"
                                                cover={<img alt={item.name} src={item.imgSrc} />}
                                                styles={{
                                                    cover: {
                                                        borderBottom: `#A71316 6px solid`
                                                    },
                                                    body: {
                                                        padding: "12px 15px"
                                                    }
                                                }}
                                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                    showModalCreate(item)
                                                }}
                                            >
                                                <div className="space-y-2">

                                                    <h1 className="text-xl font-semibold">{item.name}</h1>
                                                    <p className="font-medium">
                                                        {"$" + item.price}
                                                    </p>
                                                    <div className="h-full flex justify-between items-end space-x-3">

                                                        <div>
                                                            {
                                                                isItemExistingInStore(item) &&
                                                                <div>
                                                                    <QuantityBtnGroup quantity={1} closure={(value:number)=>{
                                                                        dispatch(addItem({...item,quantity:value}))
                                                                    }}/>
                                                                </div>
                                                            }
                                                        </div>

                                                        <div>

                                                            {
                                                                !isItemExistingInStore(item) &&
                                                                <Button type="text" color="default" variant="filled" onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    e.preventDefault()
                                                                    dispatch(addItem({...item,quantity:1}))
                                                                }}>
                                                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                                                </Button>
                                                            }


                                                            {
                                                                isItemExistingInStore(item) &&
                                                                <Button type="text" color="danger" variant="filled" onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    e.preventDefault()
                                                                    dispatch(removeItemFromCart(item))
                                                                }}>
                                                                    <i className="fa-solid fa-thumbtack-slash"></i>
                                                                </Button>
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

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


