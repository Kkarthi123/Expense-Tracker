import React from 'react'
import { AgCharts } from "ag-charts-react";

const PieChart = ({options}) => {
  return (
    <div className='bg-white shadow-md rounded-md p-[10px] w-[450px]'> 
        <AgCharts options={options} />
    </div>
  )
}

export default PieChart