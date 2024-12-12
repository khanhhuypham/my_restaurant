import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_LINK } from "../../routes/route-link";

export const ChargeMethod = () =>{

    const navigate = useNavigate();


    return (
        <>

            <div className="flex flex-col justify-center items-center space-y-4" >
                <h1 className="text-2xl font-bold">
                    Stripe Payments with React & Java
                </h1>

                <Button
                    className="font-bold bg-teal-500"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    ORDER NOW
                </Button>

                <Button
                    className="font-bold bg-blue-500"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    Hosted Checkout
                </Button>

                <Button
                    className="font-bold bg-amber-500 text-black"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    New Subcription
                </Button>

                <Button
                    className="font-bold bg-purple-600"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    Cancel Subcription
                </Button>

                <Button
                    className="font-bold bg-orange-700"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    Subsciprtion With Trial
                </Button>

                <Button
                    className="font-bold bg-pink-700"
                    type="primary"
                    size="middle"
                    onClick={() => navigate(ROUTE_LINK.PAYMENT)}
                >
                    View Invoices
                </Button>
            </div>


        </>
    );
}