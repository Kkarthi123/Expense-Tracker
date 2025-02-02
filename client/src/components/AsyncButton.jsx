import React from 'react'
import CircleLoader from './circleLoader'
import DotLoaders from './DotLoaders'

const AsyncButton = ({buttonName, customButtonClass, buttonTooltip, isActionRunning, onButtonClick=null, buttonType}) => {
  return (
    <button type={buttonType} className={`min-h-[40px] ${customButtonClass}`} title={buttonTooltip} onClick={onButtonClick}>
        {isActionRunning ? <DotLoaders />: buttonName}
    </button>
  )
}

export default AsyncButton