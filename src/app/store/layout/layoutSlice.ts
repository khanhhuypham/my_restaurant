import { Layout } from 'antd';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';



export interface ILayoutState {
    breadcrumb: string;
    drawerOpen:boolean
}

const initialState: ILayoutState = {
    breadcrumb: "",
    drawerOpen:false
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        
        setBreadcrumb: (state: any, action: PayloadAction<string>) => {
            state.breadcrumb = action.payload;
        },

        setDrawerOpen: (state: any, action: PayloadAction<boolean>) => {
            state.breadcrumb = action.payload;
        },

    },
});

export const {setBreadcrumb} = layoutSlice.actions;
export const layoutSelector = (state: RootState) => state.sidebar;
