import React from 'react'
import TopHeader from '../components/TopHeader'
import WrapperContainer from '../components/WrapperContainer'
import TableContainer from '../components/TableContainer'

const Transactions = () => {
  return (
    <>
      <TopHeader title={"All Tranactions"} description={"Track and manage all your expenses effortlessly from one place"}/>
      <WrapperContainer>
          <TableContainer/>
      </WrapperContainer>
    </>
  )
}

export default Transactions