import React from 'react'
import NoDataFreezer from '../NoDataFreezer'

const TopItems = ({options}) => {
   
  return (
    <div className='bg-white shadow-md rounded-md w-[360px]'> 
        <div className='p-2 bg-[#4b6b87] rounded-t-md font-medium text-lg text-[whitesmoke]'>
            {options.title}
        </div>
        <div className='p-3 '>
            {options.data?.length ? (
                 options.data.map((item)=>{
                    return (
                        <div key={item._id} className='flex justify-between py-1.5'>
                            <div className='max-w-[250px] text-ellipsis overflow-hidden'>
                                <div>{item.category}</div>
                                <div className='text-xs text-[#aaaaaa]' title={item.description}>{item.description}</div>
                            </div>
                            <div className={`${item.type == 0 ? "text-green-500": "text-red-500"} font-medium`}>
                                {Math.trunc(item.amount)}
                            </div>
                        </div>
                    )
                 })
                ):(
                    <div className='min-h-[500px] flex place-items-center justify-center'> 
                        <NoDataFreezer />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default TopItems