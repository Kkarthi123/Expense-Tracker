
const StatConfig =  [
  {title: "Income", value: "$totalIncome", type: "income", iconClass:"fa-solid fa-hand-holding-dollar"},
  {title: "Expense", value: "$totalExpense", type: "expense", iconClass:"fa-solid fa-sack-dollar"},
  {title: "Balance", value: "$balance", type: "balance", iconClass:"fas fa-balance-scale"},
  {title: "Transactions", value: "$totalTransactions", type: "transactions", iconClass:"fas fa-exchange-alt"}
]


let colors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#C70039", "#900C3F", "#581845", "#FF33F6",]


const ChartType  = Object.freeze({
  pie: 0,
  bar:1,
  area:2
})


const ChartConfigs = {
  byCategory:{
    chartType: ChartType.pie,
    title: {
      text: "Transactions By Category"
    },
    series:[
      {
        type: "pie",
        angleKey: "total",
        legendItemKey: "_id",
      }
    ],
  },
  byPaymentMode:{
    chartType: ChartType.pie,
    title: {
      text: "Transactions By Payment Mode"
    },
    series:[
      {
        type: "pie",
        angleKey: "total",
        legendItemKey: "_id",
      }
    ],
  },
  monthlyTrend:{
    chartType: ChartType.bar,
    title: {
      text: "Monthly Trend - Income vs Expense",
    },
    series:[
      {
        type: "bar",
        xKey: "_id",
        yKey: "income",
        yName: "Income",
        fill: "#459d55"
      },
      {
        type: "bar",
        xKey: "_id",
        yKey: "expenses",
        yName: "Expense",
        fill: "#d04c4c"
      }
    ],
    height: 350 

  },
  topSpendingByCategory:{
    chartType: ChartType.bar,
    title: {
      text: "Top Spending By Category",
    },
    series:[
      {
        type: "bar",
        direction: "horizontal",
        xKey: "_id",
        yKey: "total",
        fill: "#bd6c47"
      }
    ],
    height: 350 
  },
  topIncomeByCategory:{
    chartType: ChartType.bar,
    title: {
      text: "Top Income's By Category",
    },
    series:[
      {
        type: "bar",
        direction: "horizontal",
        xKey: "_id",
        yKey: "total",
        fill: "#17ab6c"
      }
    ],
    height: 350 
  },
  expenseForeCast:{
    chartType: ChartType.area,
    title:{
      text: "Expense Forecast for Next Three Months"
    },
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "predictedExpense",
        yName: "Average Moving Expense",
      },
    ]
  }
}

module.exports = {StatConfig ,ChartConfigs, ChartType}
