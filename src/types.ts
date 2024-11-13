export type CustomOption = {
    id: string;
    name: string;
    price?: string;
};

export type MenuCategory =
    | ""
    | "appetizers"
    | "soups"
    | "main-entree"
    | "bowls"
    | "fried-rice-noodles"
    | "side-orders"
    | "beverages";

export interface MenuItem {
    id: string;
    category: MenuCategory;
    imgSrc: string;
    name: string;
    description: string;
    price: string;
    quantity:number;
    dumpling?: CustomOption[];
    soup?: CustomOption[];
    bowl?: CustomOption[];
    protein?: CustomOption[];
    tea?: CustomOption[];
    coke?: CustomOption[];
}
