

import { useState, useEffect } from "react";

import { Button, Form, Input, message, Select, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Category } from "../../models/category/category";
import { categoryService } from "../../services/category/categoryService";
import { User } from "../../models/user/user";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { cartSelector, mountChargeMethod } from "../../store/cart/cartSlice";
import { paymentService } from "../../services/payment/PaymentService";
import { CheckoutForm, ItemOfCheckoutForm } from "../../models/payment/checkout-form";
import { ProductOfCheckoutForm } from "./ProductOfCheckoutForm";


const { Option } = Select;
export const CheckoutFormComponent = ({
    user,
    onConfirm,
    onClose,
}: {
    user: User;
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    // const [data, setData] = useState<User>(new User());
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const cartSlice = useAppSelector(cartSelector);



    const onFinish = (value: CheckoutForm) => {

        let items = cartSlice.items.map((item) => {
            return {
                name: item.name,
                quantity: item.quantity,
                amount: item.price*100,
                currency:value.currency
            }
        })

    
        const checkoutForm:CheckoutForm = {
            ...value,
            successUrl:"http://localhost:3000",
            cancelUrl:"http://localhost:3000",
            items:items
        }
        
        paymentService.StripeHostedCheckout(checkoutForm).then((res) => {
            
            if (res.status == 200) {
                console.log(res.data)
                window.location.href= res.data.sessionUrl
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });

    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );


    useEffect(() => {
        dispatch(mountChargeMethod(form.submit))
        form.resetFields()
        form.setFieldsValue({
            name: "phạm khánh huy",
            email:"khanhhuypham.1110@gmail.com",
            phone:"0941695140",
            currency:"USD",
            description: ""
        });
       
    }, [user]);

    return (
        <div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Full name"
                    rules={[
                        { required: true },
                        { type: "string", min: 2 },
                    ]}
                    className="mb-3"
                >
                    <Input
                        placeholder="Enter..."
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email address"
                    rules={[
                        { required: true },
                        { type: "string", min: 2 },
                    ]}
                    className="mb-3"
                >
                    <Input placeholder="Enter..."/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="currency"
                    label="Currency"
                    rules={[{ required: true, message: 'Please input donation amount!' }]}
                >
                    <Select placeholder="Select currency" defaultValue={"VND"}>
                        <Option value="USD">$ USD</Option>
                        <Option value="CNY">¥ JPY</Option>
                        <Option value="VND">đ VND</Option>
                    </Select>

                </Form.Item>


                <Form.Item name="description" label="Description" className="mb-10">
                    <TextArea rows={3} placeholder="Description...."/>
                </Form.Item>

            </Form>
        </div>
    );
};








// <div className="space-y-[20px] ">
// <div className="space-y-[30px]">
//     <div className="space-x-2 text-xl font-semibold">
//         <i className="fa-solid fa-location-dot text-orange-500"></i>
//         <span>Delivery address</span>
//     </div>
//     <div className="grid grid-cols-3 gap-3">
//         <Card className="bg-orange-500 text-white">
//             <i className="fa-solid fa-location-dot text-xl"></i>
//             <p>
//                 {" "}
//                 Dno. 12-34-12, XYC Apartments, DOOR Colony,
//                 Hyderabad, Telangana
//             </p>
//         </Card>
//         <Card className="border-dashed border-2 border-orange-500">
//             <i className="fa-solid fa-location-dot text-xl"></i>
//             <p>
//                 {" "}
//                 Dno. 12-34-12, XYC Apartments, DOOR Colony,
//                 Hyderabad, Telangana
//             </p>
//         </Card>
//     </div>

//     <div className="w-64 space-y-4">
//         <Input placeholder="name" />
//         <Input placeholder="email" />
//     </div>

// </div>

// <div className="space-y-[30px]">
//     <div className="space-x-2 text-xl font-semibold">
//         <i className="fa-solid fa-location-dot text-orange-500"></i>
//         <span>Type of order</span>
//     </div>
//     <div className="flex justify-start gap-6">
//         {Object.values(OrderType).map((value) => {
//             if (typeof value === "number") {
//                 let className = `
//                 ${value.valueOf() === option.order_type
//                         ? "bg-orange-500 text-white "
//                         : "border-dashed border-[2px] border-orange-500 "
//                     }
//                 space-x-2 py-2 px-3.5 rounded-md
//                 visited:text-purple-600
//                 `;

//                 switch (value.valueOf()) {
//                     case OrderType.SUBSCRIPTION.valueOf():
//                         return (
//                             <button
//                                 className={className}
//                                 onClick={() => {
//                                     setOption({
//                                         ...option,
//                                         order_type:
//                                             OrderType.SUBSCRIPTION,
//                                     });
//                                 }}
//                             >
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Subscription</span>
//                             </button>
//                         );
//                     case OrderType.SCHEDULE.valueOf():
//                         return (
//                             <button
//                                 className={className}
//                                 onClick={() => {
//                                     setOption({
//                                         ...option,
//                                         order_type:
//                                             OrderType.SCHEDULE,
//                                     });
//                                 }}
//                             >
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Schudle order</span>
//                             </button>
//                         );
//                     case OrderType.ORDER_NOW.valueOf():
//                         return (
//                             <button
//                                 className={className}
//                                 onClick={() => {
//                                     setOption({
//                                         ...option,
//                                         order_type:
//                                             OrderType.ORDER_NOW,
//                                     });
//                                 }}
//                             >
//                                 <i className="fa-regular fa-calendar"></i>
//                                 <span>Order Now</span>
//                             </button>
//                         );
//                 }
//             }
//         })}
//     </div>


//     <RenderOrderType type={option.order_type} />

// </div>


// </div>
