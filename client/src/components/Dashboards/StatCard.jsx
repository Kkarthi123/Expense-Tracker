import React from 'react'

const StatCard = ({stat:{title, value, iconClass, type} }) => {
  return (
    <div className='bg-white shadow-md rounded-md p-[20px] min-w-[230px] h-[90px] flex justify-between items-center' data-stat-type={type}> 
        <div>
            <p className='text-gray-500 mb-1'>{title}</p>
            <p className='text-2xl font-bold'>{Math.trunc(value)}</p>
        </div>
        <div className='ml-5'>
            <i className={`${iconClass} text-[35px]`}></i>
        </div>
    </div>
  )
}

export default StatCard