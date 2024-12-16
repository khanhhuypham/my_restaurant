import { Button, Card } from "antd"
import { QuantityBtnGroup } from "../../component/Button/ButtonGroup"
import { ItemEntity } from "../../models/item/item"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addItem, cartSelector, removeItemFromCart } from "../../store/cart/cartSlice";

export const OrderCard = ({item,onClick}:
    {item:ItemEntity;onClick?:(() => void)}
) => {
    const dispatch = useAppDispatch();
    const cartSlice = useAppSelector(cartSelector);

    const isItemExistingInStore = (item: ItemEntity): boolean => {
        let result = cartSlice.items.find((element) => element.id == item.id)
        return result === undefined ? false : true
    }

    return (
        <Card
            hoverable
            className="w-[90%] drop-shadow-md"
            cover={<img alt={item.name} src={item.image} />}
            styles={{
                cover: {
                    borderBottom: `#A71316 6px solid`
                },
                body: {
                    padding: "12px 15px"
                }
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                {onClick && onClick()}
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
                                <QuantityBtnGroup quantity={1} closure={(value: number) => {
                                    dispatch(addItem({ ...item, quantity: value }))
                                }} />
                            </div>
                        }
                    </div>

                    <div>

                        {
                            !isItemExistingInStore(item) &&
                            <Button type="text" color="default" variant="filled" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                dispatch(addItem({ ...item, quantity: 1 }))
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
}