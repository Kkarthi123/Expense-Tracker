const express = require("express");
const TransactionsModel = require("../models/transactionsModel");
const { default: mongoose } = require("mongoose");
const {StatConfig, ChartConfigs} = require("../config/DashboardConfig");
const { getDateAggregationRule } = require("../helper/aggregationHelper");
const { predictExpenseForeCast } = require("../helper/dashboardDataHelper");
const { TransactionType } = require("../config/constant");
const DashboardRouter = express.Router();

// stats
DashboardRouter.get("/stats", async(req,res)=>{
    let {startDate, endDate} = req.query;

    try {
        const statData = await TransactionsModel.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(req.body.userId)}},
            {
              $match: {
                ...(getDateAggregationRule(startDate,endDate))
              },
            },
            { 
                $group: {
                  _id: "$userId",
                  totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", TransactionType.Expenses] }, "$amount", 0] } // Sum for expenses
                  },
                  totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", TransactionType.Income] }, "$amount", 0] } // Sum for income
                  },
                  totalTransactions: { $sum: 1 }, // Count of all transactions
                },
            },
            {
              $addFields:{
                balance: { $subtract: ["$totalIncome", "$totalExpense"] }, // Balance
              }
            },
            {
              $project: {
                _id: 0,
                stats: StatConfig
              }
            }
        ]);

        if(statData.length == 0){
          statData[0] = {
            stats : StatConfig.map((item)=>({...item, value:0}))
          } 
        }

        res.status(200).send(statData[0])
    } catch (error) {
        res.status(500).json({status: 0, message: "Failed to get stats", error})
    }
});

//top5
DashboardRouter.get("/recentItems", async(req,res)=>{
    try {
        const topItems= await TransactionsModel.find({userId: req.body.userId}).sort({date: -1}).limit(10).select("-userId");

        let obj = {
          title: "Recent Transactions",
          data: topItems
        }


        res.status(200).send(obj);
    } catch (error) {
        res.status(500).json({status: 0, message: "Failed to get recent Items", error})
    }
})

//chartData
DashboardRouter.get("/chartsData", async(req,res)=>{

  let {startDate, endDate} = req.query;

    try {
      const TranactionsByCategory = await TransactionsModel.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.body.userId) } },
        {
          $facet:{
            byCategory: [
              {
                $match: {
                  ...(getDateAggregationRule(startDate,endDate))
                },
              },
              {
                $group: {
                  _id: "$category", 
                  total: { $sum: "$amount" },
                },
              }
            ],
            byPaymentMode: [
              {
                $match: {
                  ...(getDateAggregationRule(startDate,endDate))
                },
              },
              {
                $group: {
                  _id: "$paymentMode",
                  total: { $sum: "$amount" },
                },
              },
            ],
            monthlyTrend:[
              {
                $match: {
                  ...(getDateAggregationRule(startDate,endDate))
                },
              },
              {
                $group:{
                  _id: {$dateToString: {format: "%Y-%m", date: "$date"}},
                  income:{
                    $sum: {$cond:[{$eq: ["$type", TransactionType.Income]}, "$amount", 0]}
                  },
                  expenses: {
                    $sum: { $cond: [{ $eq: ["$type", TransactionType.Expenses] }, "$amount", 0] }, 
                  },
                },
              },
              { $sort: { _id: 1 } }
            ],
            topSpendingByCategory:[
              {
                $match: {
                  ...(getDateAggregationRule(startDate,endDate))
                },
              },
              {
                $match:{type: TransactionType.Expenses}
              },
              {
                $group: {
                  _id: "$category", 
                  total: { $sum: "$amount" },
                },
              },
              {
                $sort: { total: -1 }
              },
              {
                $limit: 5
              }
            ],
            topIncomeByCategory:[
              {
                $match: {
                  ...(getDateAggregationRule(startDate,endDate))
                },
              },
              {
                $match:{type: TransactionType.Income}
              },
              {
                $group: {
                  _id: "$category", 
                  total: {
                    $sum: { $cond: [{ $eq: ["$type", TransactionType.Income] }, "$amount", 0] }, 
                  }
                },
              },
              {
                $sort: { total: -1 }
              },
              {
                $limit: 5
              }
            ],
            expenseForeCast:[
              {
                $group: {
                  _id: {$month: "$date"}, 
                  expense: { $sum: "$amount" },
                },
              },
              {
                $sort: {_id: 1}
              }
            ]
          }
        }
      ]);



      let allChartData = {
        byCategory:{...ChartConfigs.byCategory, data: TranactionsByCategory[0].byCategory},
        byPaymentMode:{...ChartConfigs.byPaymentMode, data: TranactionsByCategory[0].byPaymentMode},
        monthlyTrend: {...ChartConfigs.monthlyTrend, data: TranactionsByCategory[0].monthlyTrend},
        topSpendingByCategory: {...ChartConfigs.topSpendingByCategory, data: TranactionsByCategory[0].topSpendingByCategory},
        topIncomeByCategory: {...ChartConfigs.topIncomeByCategory, data: TranactionsByCategory[0].topIncomeByCategory},
        expenseForeCast:{...ChartConfigs.expenseForeCast, data: predictExpenseForeCast(TranactionsByCategory[0].expenseForeCast)}
      }
      

      res.status(200).send(allChartData)
    } catch (error) {
      res.status(500).json({ status: 0, message: "Failed to get stats", error })
    }
})




module.exports = DashboardRouter;