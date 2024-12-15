import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTE_LINK } from "../../routes/route-link";


import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { BagDrawer } from "../BagDrawer/BagDrawer";
import { cartSelector } from "../../store/cart/cartSlice";
import logo from "../../assets/images/logo-light.png";


const { Header, Content, Footer } = Layout;


const items = [
    {
        key: String(1),
        label: (<NavLink to={ROUTE_LINK.HOME}>
            <img src={logo} alt="logo" className=" w-16 h-16"/>
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


export const CustomLayout: React.FC = () => {


    const cardSlice = useAppSelector(cartSelector);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                className="bg-white"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    // theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />

     
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

            </Header>
            <Content>
                <div

                    style={{
                        minHeight: 380,
                        borderRadius: borderRadiusLG,
                    }}

                    className="bg-[#F0F0F0]"
                >
                    <Outlet />
                </div>
            </Content>

            <BagDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} input={cardSlice.items}/>
            
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
            
        </Layout>
    );
};


