import { DatePicker, DatePickerProps } from "antd";
import type { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { DATE_FORMAT } from "../../constants/constant";



export const CalendarBtn = ({ content,closure }: { content:JSX.Element;closure:(() =>void)}) => {
    const [open, setOpen] = useState(false)
  

    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
        // console.log( (value as Dayjs).format(DATE_FORMAT.DDMMYYY).toString())
        console.log(dateString)
      };

    // const ref = useOutsideClick(() => {
    //     setOpen(false)
    // });
    
  
    return (
        <div className="relative"
            onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {


                e.preventDefault()
                e.stopPropagation()
                setOpen(true)

            }}
        >
          
            {content}

            <div className="absolute top-0 left-0 right-0 bottom-0 invisible">
                <DatePicker
          
                className="h-full"
                format={DATE_FORMAT.DDMMYYY}
                open={open}
                needConfirm
                onOpenChange={(s) =>{
                    setOpen(false)
                }}
            
                onChange={onChange}
                />
            </div>

        </div>
    )

}
