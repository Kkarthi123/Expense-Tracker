import React, { useEffect } from 'react'
import StatCard from './Dashboards/StatCard'
import { useDashboradContext }from '../context/DashboradContext';
import Datepicker from 'react-tailwindcss-datepicker';
import PieChart from './Dashboards/PieChart';
import BarChart from './Dashboards/BarChart';
import TopItems from './Dashboards/TopItems';
import Skeleton from '@mui/material/Skeleton';



const DashboradWrapper = () => {

  const {statData, chartData, recentItems, setDashboardDateFilterCallback, dashboardDateFilter} = useDashboradContext();

  return (
    <div className=' w-full mx-auto min-h-[90vh] p-7'>
      <div className='text-right'>
        <div className='w-[300px] inline-block float-right text-left'>
            <Datepicker 
              inputClassName="border relative transition-all duration-300 p-[10px] w-full border-gray-300 outline-none rounded-md text-sm cursor-pointer bg-gray-50"
              value={dashboardDateFilter} 
              onChange={newValue => setDashboardDateFilterCallback(newValue)} 
              showShortcuts={true} 
              separator="to" 
              showFooter={true} 
              displayFormat="DD/MM/YYYY" 
              startFrom={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)} 
              maxDate={new Date()}
              primaryColor={"indigo"}
            />
        </div>
      </div>
      <div className='flex items-center gap-x-16'>
            {
              statData ? (
                statData.map((stat, index) => {
                  return <StatCard key={index} stat={stat} animation="wave"/>
                })

              ):(
                <div className='flex gap-x-16'>
                  {
                    new Array(4).fill(0).map((item, i)=>{
                      return <Skeleton key={i} className="rounded" variant="rectangular" width={230} height={90} sx={{ bgcolor: '#d4dbe1' }}/>
                    })
                  }
              </div>
              )
            }
      </div>
      <div className='main-chart-wrapper py-10'>
     
        {
          chartData ?( 
          <>
            <div className='flex gap-x-8'>
              <div className='flex flex-wrap gap-8 flex-[0]'>
                <div className='flex gap-8'>
                  <PieChart options={chartData.byCategory} />
                  <BarChart options={chartData.monthlyTrend}/>
                </div>
                <div className='flex gap-8'>
                  <BarChart options={chartData.topSpendingByCategory}/>
                  <PieChart options={chartData.byPaymentMode} />
                </div>
              </div>
              <div>
                 <TopItems options={recentItems} />
              </div>
            </div>
            <div className='flex mt-8'>
              <div className='flex gap-8'>
               <BarChart options={chartData.topIncomeByCategory}/>
               <BarChart options={chartData.expenseForeCast}/>
              </div>
            </div>
          </>
          ):(
            <>
              <div className='flex flex-col gap-8'>
                <div className='flex gap-8'>
                    <Skeleton className="rounded" variant="rectangular" width={450} height={380} sx={{ bgcolor: '#d4dbe1' }}/>
                    <Skeleton className="rounded" variant="rectangular" width={900} height={380} sx={{ bgcolor: '#d4dbe1' }}/>
                </div>
                <div className='flex gap-8'>
                    <Skeleton className="rounded" variant="rectangular" width={900} height={380} sx={{ bgcolor: '#d4dbe1' }}/>
                    <Skeleton className="rounded" variant="rectangular" width={450} height={380} sx={{ bgcolor: '#d4dbe1' }}/>
                </div>
              </div>
            </>
          )

        }

      </div>
    </div>
  )
}

export default DashboradWrapper