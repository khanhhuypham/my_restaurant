import React, { useState } from "react";
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";

import { Badge, Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTE_LINK } from "../../routes/route-link";


import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { BagDrawer } from "../BagDrawer/BagDrawer";
import { cartSelector } from "../../store/cart/cartSlice";
import logo from "../../assets/images/logo-light.png";
import Sidebar from "./side-bar";
import Footer from "./footer";


const { Header, Sider,Content } = Layout;


const items = [
    {
        key: String(1),
        label: (<NavLink to={ROUTE_LINK.HOME}>
            <img src={logo} alt="logo" className=" w-16 h-16" />
        </NavLink>),
    },

    {
        key: String(2),
        label: (<NavLink to={ROUTE_LINK.DASHBOARD}>
            <span className="font-semibold text-xl">Dashboard</span>
        </NavLink>),
    },
    {
        key: String(3),
        label: (<NavLink to={ROUTE_LINK.ORDER}>
            <span className="font-semibold text-xl">Order</span>
        </NavLink>),
    },
    {
        key: String(4),
        label: (<NavLink to={ROUTE_LINK.CATEGORY_MANAGEMENT}>
            <span className="font-semibold text-xl">Category</span>
        </NavLink>
        )
    },

    {
        key: String(5),
        label: (<NavLink to={ROUTE_LINK.ITEM_MANAGEMENT}>
            <span className="font-semibold text-xl">Item</span>
        </NavLink>
        )
    },

    {
        key: String(6),
        label: (<NavLink to={ROUTE_LINK.CHARGE_METHOD}>
            <span className="font-semibold text-xl">Charge method</span>
        </NavLink>
        )
    }
]

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };
  


export const CustomLayout: React.FC = () => {
    const cardSlice = useAppSelector(cartSelector);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Sidebar/>
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>

                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        backgroundColor:"white"
                 
                    }}
                >
                    <div className=" h-full w-full flex justify-end items-center">
                    <Badge
                        color={"#A71316"}
                        count={cardSlice.items.length}
                        className="font-bold"
                    >
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            className="bg-black"
                            icon={<ShoppingOutlined />}
                            onClick={() => setOpenDrawer(true)}
                        />
                    </Badge>
                    </div>

                  

                </Header>
                <Content>
                    <div

                        style={{
                            minHeight: 380,
                            borderRadius: borderRadiusLG,
                        }}

                        className="bg-[#FFF4EE]"
                    >
                        <Outlet />
                    </div>
                </Content>

                <BagDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} input={cardSlice.items} />

               <Footer/>
            </Layout>
        </Layout>
    );
};


