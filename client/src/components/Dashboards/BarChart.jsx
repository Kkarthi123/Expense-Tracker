import React from 'react'
import { AgCharts } from "ag-charts-react";

const BarChart = ({options}) => {
  return (
    <div className='bg-white shadow-md rounded-md p-[15px] w-[700px]'> 
        <AgCharts options={options} />
    </div>
  )
}

export default BarChart