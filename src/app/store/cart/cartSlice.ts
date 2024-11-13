import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MenuItem } from "../../../types";
import { stat } from "fs";




export interface ICartState {
    items: MenuItem[];
}

const initialState: ICartState = {
    items:[]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        setCart: (state: ICartState, action: PayloadAction<MenuItem>) => {
            const index: number | undefined = state.items.findIndex((item) => item.id == action.payload.id)
          
            if (index === -1){
                state.items.push(action.payload)
            }else{
                state.items[index] = action.payload;
            }

           
        },

          
        removeItemFromCart: (state: ICartState, action: PayloadAction<MenuItem>) => {
            const index: number | undefined = state.items.findIndex((item) => item.id == action.payload.id)
            
            if (index !== -1){
                state.items.splice(index, 1);
            }

           
        },

               
    
    },
});

export const {setCart,removeItemFromCart} = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
