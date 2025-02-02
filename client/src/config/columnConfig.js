import { PaymentMode, TransactionType } from "./constants"

export default [
      {field: "category"},
      {
        field: "date",
        valueGetter: (params) => {
            return new Intl.DateTimeFormat("en-GB").format(new Date(params.data.date))
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