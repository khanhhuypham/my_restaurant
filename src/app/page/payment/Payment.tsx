import { Button, Card, Input, List } from "antd";
import lineImg from "../../assets/images/line.png";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import { MenuItem } from "../../../types";
import { addItem, cartSelector, removeItemFromCart } from "../../store/cart/cartSlice";
import { PhoneFilled, EnvironmentFilled } from "@ant-design/icons";
import { ItemEntity } from "../../models/Item/item";
import TextArea from "antd/es/input/TextArea";
import { QuantityBtnGroup } from "../../component/Button/ButtonGroup";
import { CalendarBtn } from "../../component/Button/CalendarBtn";
import { OrderType } from "../../constants/enum";
import { getCurrentDate } from "../../utils/utils";
import { isSemicolonClassElement } from "typescript";
import { CheckoutFormComponent } from "./CheckoutForm";
import { Category } from "../../models/category/category";
import { User } from "../../models/user/user";
import { ProductOfCheckoutForm } from "./ProductOfCheckoutForm";

export const Payment = () => {

    return (
        <div className="space-y-12 bg-white h-full pl-[200px] pr-[70px]">
            <div className="space-y-2">
                <h1 className="text-start font-bold text-xl">CHECKOUT</h1>
                <hr className="bg-gray-700 h-[1.5px]" />
            </div>

            <div className="grid grid-cols-2 gap-20">
                <CheckoutFormComponent user={new User()} />
                <ProductOfCheckoutForm />
            </div>
        </div>
    );
};

