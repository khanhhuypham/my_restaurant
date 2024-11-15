import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { PlusOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons';


export const QuantityBtnGroup = ({quantity}:{quantity:number}) => {

    const [data,setData] = useState<number>(0)

    useEffect(()=>{
        setData(data)
    },[quantity])

    return (
     
            <div className='flex rounded-lg'>
                <Button
                    className='rounded-none rounded-l-md'
                    icon={<MinusOutlined />}
                    onClick={(e:React.MouseEvent<HTMLElement, MouseEvent>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setData(data - 1)
                    }}
                />
                <Input

                    value={data}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setData(Number(e.target.value))
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
                        setData(data + 1)
                    }}
                />

            </div>
    
    )

}