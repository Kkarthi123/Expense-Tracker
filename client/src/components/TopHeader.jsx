import React from 'react'

const TopHeader = ({title, description, isSticky=true}) => {
  return (
    <div className={`bg-white shadow-md w-full h-[55px] flex exp-top-header ${isSticky ? 'sticky top-0 z-10' : ''}`}>
         <div className='py-1.5 px-4 flex flex-col justify-center'>
            <div className='font-bold text-[16px] leading-[22px]'>{title}</div>
            {description && <p className='text-gray-500 text-[13px]'>{description}</p>}
         </div>
    </div>
  )
}

export default TopHeader