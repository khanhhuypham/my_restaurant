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

// export type MenuItemFormValues = {
//     radio: string;
//     quantity: number;
//     specialInstructions: string;
// };

// export type BagItemOptions = {
//     bagItemId: string;
//     totalItemPrice: string;
//     quantity: number;
//     radioOption?: string;
//     specialInstructions: string;
// };

// export interface BagItem extends MenuItem {
//     bagItemId: string;
//     totalItemPrice: string;
//     quantity: number;
//     radioOption?: string;
//     specialInstructions: string;
// }

// export type BagContextType = {
//     bag: BagItem[];
//     totalItems: number;
//     subtotalText: string;
//     taxText: string;
//     totalText: string;
//     isDarkMode: boolean;
//     addItem: (bagItem: BagItem) => void;
//     updateItem: (bagItem: BagItem) => void;
//     deleteItem: (bagItemId: string) => void;
//     toggleDarkMode: (setDarkMode: boolean) => void;
// };

// export type NutriTableKey =
//     | "id"
//     | "category"
//     | "name"
//     | "servings"
//     | "calories"
//     | "calFromFat"
//     | "fat"
//     | "saturatedFats"
//     | "transFat"
//     | "cholesterol"
//     | "sodium"
//     | "carbs"
//     | "fiber"
//     | "sugar"
//     | "protein";

// export type NutriTableHeader = {
//     title: string;
//     id: NutriTableKey;
// };

// export interface NutritionItem {
//     id: string;
//     category: MenuCategory;
//     name: string;
//     servings: number;
//     calories: number;
//     calFromFat: number;
//     fat: string;
//     saturatedFats: string;
//     transFat: string;
//     cholesterol: string;
//     sodium: string;
//     carbs: string;
//     fiber: string;
//     sugar: string;
//     protein: string;
// }
