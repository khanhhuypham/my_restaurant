import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { PlusOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons';


export const QuantityBtnGroup = ({quantity,closure}:{quantity:number;closure:((arg0: number)=> void)}) => {

    const [data,setData] = useState<number>(quantity)

    useEffect(()=>{
        setData(data)

    },[quantity])


    const handleChangQuantity = (arg0: number) =>{
        let quantity = arg0
        if (quantity <= 0 ){
            quantity = 0
        }else if (quantity >= 999 ){
            quantity = 999
        }

        setData(quantity)
        closure(quantity)
    }

    
    return (
     
            <div className='flex rounded-lg'>
                <Button
                    className='rounded-none rounded-l-md'
                    icon={<MinusOutlined />}
                    onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(data - 1)
                        
                    }}
                />
                <Input
                    value={data}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(Number(e.target.value))
                    }}
                    className="rounded-none w-14 text-center"
                    type='number'
                />
                <Button
                    className='rounded-none rounded-r-md'
                    icon={<PlusOutlined />}
                    onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleChangQuantity(data + 1)
                    }}
                />

            </div>
    
    )

}