import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, message, Modal } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemEntity, ItemEntityPage } from "../../models/item/item";
import { OrderModalContent } from "./component/OrderModalContent";
import { useAppSelector } from "../../hooks/useRedux";
import { cartSelector } from "../../store/cart/cartSlice";
import { categoryService } from "../../services/category/categoryService";
import { ItemService } from "../../services/item/ItemService";
import { ReactComponent as Icon_prev } from "../../assets/icons/angle-double-left.svg";
import { ReactComponent as Icon_next } from "../../assets/icons/angle-double-right.svg";
import { ItemListProps } from "../ItemManagement/ItemMangement";
import { OrderCard } from "./component/OrderCard";
import { Category } from "../../models/category/category";





export const Order = () => {
    let sliderRef = useRef<Slider | null>(null)
    // const [data, setData] = useState<ItemEntityPage>(new ItemEntityPage());
    const [categories, setCategories] = useState<Category[]>([]);
    const cardSlice = useAppSelector(cartSelector);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const [parameter, setParameter] = useState<ItemListProps>({
        // category_type:7,
        // category_id:1,
        out_of_stock: false,
        search_key: "",
        page: 1,
        limit: 200,
    });


    const handleCategoryClick = (categoryId:number) => {
        setCategories((prevCategories) => prevCategories.map((item) =>
                item.id === categoryId
                    ? { ...item, select: true }
                    : { ...item, select: false }
            ))
    };




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

            if (res.status == 200) {
                setCategories(res.data)
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error)
        })

        ItemService.List(parameter).then((res) => {

            if (res.status == 200) {
          
                const {list, ...rest } = res.data;
                const result = { ...rest, data: list };
                console.log(result)
                setParameter(result);
               
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });

    }, []);



    return (
        <div >
            <div className="w-full bg-white">
                <div className=" flex justify-center items-center">
                    <Button className="outline-none shadow-lg h-full rounded-full hover:bg-gray-100"
                        onClick={() => sliderRef.current?.slickPrev()}
                    ><Icon_prev /></Button>
                    <div className="w-[50%]">
                        <Slider {...settings} ref={sliderRef}>
                            {categories.map((cate) => {
                                return (
                                    <div
                                        key={cate.id}
                                        className={`py-6 px-2 text-center cursor-pointer text-lg font-bold ${cate.select ? "border-b-4  border-solid border-orange-500" : ""}`}
                                        onClick={() => handleCategoryClick(cate.id)}
                                    >
                                        <span className={cate.select ? "text-orange-500" : ""}>{cate.name}</span>
                                    </div>
                                );
                            })
                            }
                        </Slider>
                    </div>
                    <Button
                        className="outline-none shadow-lg rounded-full hover:bg-gray-100"
                        onClick={() => sliderRef.current?.slickNext()}
                    >
                        <Icon_next />
                    </Button>
                </div>
            </div>

            <div className="md:px-5 lg:px-10">
                {categories.map((cate) => {
                    return (
                        <div key={cate.id} className="">

                            <div className="space-y-2">
                                <h1 className="text-start font-bold text-3xl">
                                    {cate.name}
                                </h1>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 justify-items-center">
                                {parameter.data && parameter.data.filter((item: ItemEntity) => item.category_id === cate.id)
                                    .map((item: ItemEntity) => {
                                        return (
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

        </div>

    );
};


const navMenuItems = [

    {
        key: 5,
        href: '#fried-rice-noodles',
        title: <p className="font-semibold text-lg">FRIED RICE & NOODLES</p>
    },

];


var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};