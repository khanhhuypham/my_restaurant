import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_LINK } from "./app/routes/route-link";
import { CustomLayout } from "./app/component/layout/Layout";
import { Login } from "./app/page/login/Login";

import { Router } from "./app/routes/app-router";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_LINK.LOGIN} element={<Login/>} />
                <Route path="/" element={<CustomLayout/>}>
                    {Router.map((route,i) => {
                        return <Route key={i} path={route.path} element={route.component}></Route>
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
