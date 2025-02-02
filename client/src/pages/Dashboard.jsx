import React, {useEffect} from 'react'
import TopHeader from '../components/TopHeader'
import DashboradWrapper from '../components/DashboradWrapper'
import { use } from 'react'
import { DashboradContext } from '../context/DashboradContext'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  return (
    <>
    <TopHeader title={"Dashboard"} description={"Track and manage all your expenses effortlessly from one place"}/>
     <DashboradContext>
        <DashboradWrapper />
     </DashboradContext>
    </>
  )
}

export default Dashboard