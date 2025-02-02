import React from 'react'

const WrapperContainer = ({children}) => {
  return (
    <div className='p-5'>
        <div className=' w-full mx-auto bg-white min-h-[90vh] rounded-md p-5 shadow-sm'>
            {children}
        </div>
    </div>
  )
}

export default WrapperContainer