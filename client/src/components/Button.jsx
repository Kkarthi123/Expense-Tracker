import React from 'react'

const Button = ({iconClass, buttonName, customClass, onButtonClick, buttonTooltip, isDisabled=false, iconRTL = false}) => {
  return (
    <button title={buttonTooltip} onClick={onButtonClick}  type="button" className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-1.5 text-sm font-semibold ${customClass} ${isDisabled && "opacity-40 cursor-not-allowed"}`} id="menu-button" aria-expanded="true" aria-haspopup="true" disabled={isDisabled}>
        {(!iconRTL && iconClass) && <i className={`${buttonName && 'mr-1'} ${iconClass}`}></i>}
        {buttonName && buttonName}
        {iconRTL && iconClass  && <i className={`${buttonName && 'ml-1'} ${iconClass}`}></i>}
    </button>
  )
}

export default Button