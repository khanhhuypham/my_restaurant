import { Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";

type OutletContextType = { setOpenDrawer: Dispatch<SetStateAction<boolean>> };

export default function useBagDrawer() {
    return useOutletContext<OutletContextType>();
}
