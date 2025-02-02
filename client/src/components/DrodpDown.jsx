import React, { useRef, useState } from 'react'
import useOutSideClickHandler from '../hooks/useOutSideClickHandler';

const DrodpDown = ({children, buttonName, iconClass, isCustomDropdown = false , drodDownList, customClass, itemCallback, buttonTooltip}) => {


  const [isOpen, setIsOpen] = useState(false)
  const dropDownRef = useOutSideClickHandler(setIsOpen)

  return (
    <div className={`relative inline-block text-left ${customClass}`} ref={dropDownRef}>
        <div>
            <button title={buttonTooltip} onClick={()=> setIsOpen(!isOpen)} type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {iconClass && <i className={`${buttonName && 'mr-1'} ${iconClass}`}></i>}
                {buttonName && buttonName}
            </button>
        </div>

       {
            isOpen && (
                <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none min-w-[150px]" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    {isCustomDropdown ? (
                            children
                        ) : (
                            <div className="py-1" role="none">
                                {
                                    drodDownList.map((item, i)=>{
                                        return (
                                        <div className='px-4 py-2 text-gray-700 block text-sm hover:bg-gray-100 cursor-pointer' key={i} onClick={itemCallback && (()=>itemCallback(item.value))}>
                                            {item.iconClass && <i className={`mr-1 w-[18px] ${item.iconClass}`}></i>}
                                            <span role="menuitem" tabIndex="-1" id="menu-item-0">{item.name}</span>
                                        </div>
                                        )
                                    })
                                }
        
                            </div>
                        )
                    }
                </div>
            )

       }
  </div>
  
  )
}

export default DrodpDown