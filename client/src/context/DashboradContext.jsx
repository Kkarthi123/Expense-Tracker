import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import { PaymentMode } from '../config/constants';
import axiosInstance from '../utils/axios-instance';

const DashContext = React.createContext();
export const useDashboradContext = () => useContext(DashContext); 

export const DashboradContext = ({children}) => {

   const [statData, setStatData] = useState(null);
   const [chartData, setChartData] = useState(null);
   const [recentItems, setRecentItems] = useState([]);
   const [isChartDataLoading, SetIsChartDataLoading] = useState(true);
   const [isStatDataLoading, setIsStatDataLoading] = useState(true);
   const [isRecentItemLoading, setIsRecentItemLoading] = useState(true);
   const [dashboardDateFilter, setDashboardDateFilterCallback] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
   })

    useEffect(() => {
        fetchDashboardStatData();
        fetchChartData();
    }, [dashboardDateFilter])

    useEffect(()=>{
      fetchRecentTranactions();
    }, [])

    const fetchDashboardStatData = async () => {
        try {
          let statData = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/stats`, {
            withCredentials: true,
            params:{
              startDate: dashboardDateFilter.startDate,
              endDate: dashboardDateFilter.endDate 
            }
        });
        
        setStatData(statData.data.stats);
        setIsStatDataLoading(false);
      
        } catch (error) {
          console.log(error);
        }
    }
    

    const fetchChartData  = async ()=>{
      try {
        let chartData = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/chartsData`, {
          withCredentials: true,
          params:{
            startDate: dashboardDateFilter.startDate,
            endDate: dashboardDateFilter.endDate 
          }
      });

      transFormChartData(chartData.data)

      setChartData(chartData.data);
      SetIsChartDataLoading(false);
    
      } catch (error) {
        console.log(error);
      }
    }


    const fetchRecentTranactions = async()=>{
      try {
        let recentItems = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/recentItems`, {
          withCredentials: true,
      });

      setRecentItems(recentItems.data);
      setIsRecentItemLoading(false);
    
      } catch (error) {
        console.log(error);
      }

    }


    const transFormChartData = (chartData)=>{
      if(chartData && chartData.byPaymentMode){
        chartData.byPaymentMode.data.forEach(item => {
          item._id = PaymentMode[item?._id]
        });
      }
    }


 
  return (
    <DashContext.Provider value={{statData, isStatDataLoading, chartData, isChartDataLoading, recentItems, isRecentItemLoading, setDashboardDateFilterCallback, dashboardDateFilter}}>
      {children}
    </DashContext.Provider>
  )
}
