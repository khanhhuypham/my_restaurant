import { DatePicker, DatePickerProps } from "antd";
import type { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { DATE_FORMAT } from "../../constants/constant";
import dayjs from "dayjs";



export const CalendarBtn = ({ children, closure,pickerMode }: { children: React.ReactNode; closure: ((value: string) => void);pickerMode?:string}) => {
    const [open, setOpen] = useState(false)


    const onChange: DatePickerProps<Dayjs>['onChange'] = (date, dateString) => {

        closure(date.format(DATE_FORMAT.DDMMYYY_HHmm).toString())
        // setOpen(false)


    };

    // const ref = useOutsideClick(() => {
    //     setOpen(false)
    // });


    return (
        <div className="relative"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.preventDefault()
                e.stopPropagation()
                setOpen(true)
                console.log("aasdsad")
            }}
        >

            {children}

            <DatePicker
                picker="month"
                showTime={{ format: 'HH:mm' }}
                className="h-full absolute top-0 left-0 right-0 bottom-0 invisible"
                format={DATE_FORMAT.DDMMYYY_HHmm}
                open={open}
                needConfirm
                onOpenChange={(s) => {
                    setOpen(false)
                }}

                onChange={onChange}



            />



        </div>
    )

}
