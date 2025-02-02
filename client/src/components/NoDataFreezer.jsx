import React from 'react'

const NoDataFreezer = ({noDataMessage}) => {
  return (
    <div className=' h-[100%]'>{noDataMessage || "No data found!"}</div>
  )
}

export default NoDataFreezer