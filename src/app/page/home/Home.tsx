import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import {
    maxWidthXS,
    minWidth4K,
    minWidthMD,
    minWidthXL,
} from "../../assets/defaultData";
import backgroundMain from "../../assets/images/main.webp";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import Paragraph from "antd/es/skeleton/Paragraph";
import { ROUTE_LINK } from "../../routes/route-link";

// export const Home = () => {

//     const [dark, setDark] = useState(false);

//     const darkModeHandler = () => {
//         setDark(!dark);
//         document.body.classList.toggle("dark");
//     }

//     return (

//         <div className="bg-yellow-100 dark:bg-blue-900 h-[100%]">

//             <button onClick={() => darkModeHandler()}>
//                 {

//                     dark && <IoSunny />
//                 }
//                 {
//                     !dark && <IoMoon />
//                 }
//             </button>

//             <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
//                 <div>
//                     <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
//                         <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
//                     </span>
//                 </div>
//                 <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
//                 <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
//                     The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
//                 </p>
//             </div>
//         </div>
//     )
// }

export const Home = () => {
    const isScreenXS = useMediaQuery({ maxWidth: maxWidthXS });
    const isScreenMD = useMediaQuery({ minWidth: minWidthMD });
    const isScreenXL = useMediaQuery({ minWidth: minWidthXL });
    const isScreen4K = useMediaQuery({ minWidth: minWidth4K });

    const homeBannerStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundMain})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: isScreen4K ? "450px" : isScreenMD ? "360px" : "250px",
    };

    const titleStyle: React.CSSProperties = {
        padding: isScreenMD ? "75px 50px" : "50px 25px",
        width: "100%",
        marginTop: isScreen4K
            ? "50px"
            : isScreenXL
                ? "10px"
                : isScreenMD
                    ? "40px"
                    : "25px",
    };

    const titleTextStyle: React.CSSProperties = {
        fontWeight: 700,
        fontSize: isScreenXL ? "52px" : isScreenMD ? "42px" : "22px",
    };

    const whiteTextStyle: React.CSSProperties = {
        color: '#FFFFFF'
    };

    const menuButtonStyle: React.CSSProperties = {
        borderRadius: 0,
        fontWeight: 600
    };


    const navigate = useNavigate();

    return (
        <>

            <div className="flex flex-col justify-center items-center gap-12" style={homeBannerStyle} >
                <h1 className="text-6xl text-white font-bold">
                    Phạm Khánh Huy's RESTAURANT
                </h1>

                <Button
                    className="font-bold bg-red-700"
                    type="primary"
                    size="large"
                    onClick={() => navigate(ROUTE_LINK.ORDER)}
                >
                    ORDER NOW
                </Button>
            </div>

            <div className="bg-[#141414] text-center p-10">
                <h1 className="text-3xl text-white font-bold">ABOUT</h1>
                <p className="text-white font-semibold px-24">
                    New Chopstix is a restaurant that is dedicated to serving fresh asian cuisine.
                    Since inception, our chefs have been hand chopping and slicing every vegetable and meat, scratch cooking every sauce and wok-cooking each dish with the same standard of perfection.
                    Our menu is full of high quality, never frozen items that feature bold, authentic flavors. Come and experience our exceptional service in our contemporary dining room;
                </p>
            </div>

            <div className="flex justify-center items-center gap-10">
                <div className="space-y-3"> 
                    <h1 className="text-3xl font-semibold">BUSINESS HOURS</h1>
                    <p className="text-lg font-medium">Mon: Closed</p>
                    <p className="text-lg font-medium">Tues - Sun: 11:00AM - 9:30PM</p>
                </div>
                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold">LOCATION</h1>
                    <p className="text-lg font-medium">123 Fake Street, Hayward, CA 94544</p>
                    <p className="text-lg font-medium">(510) 555-1234</p>
                </div>
            </div>


        </>
    );
};
