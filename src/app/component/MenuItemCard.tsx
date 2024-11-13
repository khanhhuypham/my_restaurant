import React from "react";
import { Col, Card, Typography, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import { minWidthXL } from "../assets/defaultData";
import { MenuItem } from "../../types";


const { Title, Paragraph } = Typography;

type MenuItemCardProps = {
    menuItem: MenuItem;
    handleMenuItemClicked: (menuItem: MenuItem) => void;
};

const MenuItemCard: React.FC<MenuItemCardProps> = (props) => {
    const isScreenXL = useMediaQuery({ minWidth: minWidthXL });

    const {
        token: { colorPrimary, boxShadowSecondary },
    } = theme.useToken();

    const cardStyle: React.CSSProperties = {
        width: "90%",
        marginLeft: "5%",
        marginBottom: "36px",
        boxShadow: boxShadowSecondary,
    };

    const titleTextStyle: React.CSSProperties = {
        margin: 0,
        fontSize: isScreenXL ? "20px" : "16px",
    };

    const priceTextStyle: React.CSSProperties = {
        margin: 0,
        fontSize: isScreenXL ? "14px" : "12px",
    };

    return (
        <Col span={24} sm={12} md={8} style={{ border: "1px" }}>
            <Card
                className="menu-item-card"
                aria-label={`${props.menuItem.id}-card`}
                style={cardStyle}
                styles={{
                    cover: {
                        borderBottom: `${colorPrimary} 6px solid`,
                    },
                }}
                cover={
                    <img
                        alt={props.menuItem.name}
                        src={props.menuItem.imgSrc}
                    />
                }
                onClick={() => props.handleMenuItemClicked(props.menuItem)}
            >
                <Title level={4} style={titleTextStyle}>
                    {props.menuItem.name}
                </Title>
                {props.menuItem.price !== "0.00" && (
                    <Paragraph style={priceTextStyle}>
                        {"$" + props.menuItem.price}
                    </Paragraph>
                )}
            </Card>
        </Col>
    );
};

export default MenuItemCard;
