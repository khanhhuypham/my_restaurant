import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_LINK } from "./app/routes/route-link";
import { CustomLayout } from "./app/component/layout/Layout";
import { Login } from "./app/page/login/Login";
import { Home } from "./app/page/home/Home";
import { About } from "./app/page/about/About";
import { Dashboard } from "./app/page/dashboard/Dashboard";
import { Order } from "./app/page/order/Order";
import { Payment } from "./app/page/payment/Payment";
import { CategoryManagement } from "./app/page/categoryManagement/CategoryManagement";
import { ItemManagement } from "./app/page/ItemManagement/ItemMangement";
import { ChargeMethod } from "./app/page/chargeMethod/ChargeMethod";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_LINK.LOGIN} element={<Login/>} />
                <Route path="/" element={<CustomLayout/>}>
                    <Route path={ROUTE_LINK.DASHBOARD} element={<Dashboard/>} />
                    <Route path={ROUTE_LINK.HOME}  element={<Home/>} />
                    <Route path={ROUTE_LINK.ORDER} element={<Order/>} />
                    <Route path={ROUTE_LINK.PAYMENT} element={<Payment/>} />
                    <Route path="/about" element={<About/>} />

                    <Route path={ROUTE_LINK.CATEGORY_MANAGEMENT} element={<CategoryManagement/>} />
                    <Route path={ROUTE_LINK.ITEM_MANAGEMENT} element={<ItemManagement/>} />
                    <Route path={ROUTE_LINK.CHARGE_METHOD} element={<ChargeMethod/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
