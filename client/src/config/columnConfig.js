import { PaymentMode, TransactionType } from "./constants"

export default [
      {field: "category"},
      {
        field: "date",
        valueGetter: (params) => {
            return new Date(params.data.date).toDateString()
        }
      },
      {field: "description"},
      {
        field: "paymentMode",
        valueGetter: (params) =>{
            return PaymentMode[params.data.paymentMode]
        }
      },
      {
        field: "amount",
        cellStyle: (params) => {
          if(params.data.type == TransactionType.Income){
            return {color: "green"}
          }else{
            return {color: "red"}
          }
        }
      }
]