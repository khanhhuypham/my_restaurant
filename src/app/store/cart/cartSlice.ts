import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ItemEntity } from "../../models/item/item";


export interface ICartState {
    items: ItemEntity[];
    charge?: (() => void)
}

const initialState: ICartState = {
    items:[]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        addItem: (state: ICartState, action: PayloadAction<ItemEntity>) => {
            const index: number | undefined = state.items.findIndex((item) => item.id == action.payload.id)
          
            if (index === -1){
                state.items.push(action.payload)
            }else{
                state.items[index] = action.payload;
            }

           
        },
          
        removeItemFromCart: (state: ICartState, action: PayloadAction<ItemEntity>) => {
            const index: number | undefined = state.items.findIndex((item) => item.id == action.payload.id)
            
            if (index !== -1){
                state.items.splice(index, 1);
            }

        },

        mountChargeMethod: (state: ICartState, action: PayloadAction<(() => void)>) => {

            state.charge = action.payload
        },

        charge: (state: ICartState) => {
            {state.charge && state.charge()}
        },


    },
});

export const {addItem,removeItemFromCart,charge,mountChargeMethod} = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
