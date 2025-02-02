const predictExpenseForeCast = (data, monthsToPredict =3)=>{
    if(data && Array.isArray(data)){
        let total = data.reduce((acc, curr)=>{
            return acc + curr.expense
        },0)

        let movingAverage = total / data.length;
        let forecast = [];

        for (let i = 1; i <= monthsToPredict; i++) {
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + i);
    
            forecast.push({
                month: nextMonth.toISOString().substring(0, 7), // Format: YYYY-MM
                predictedExpense: Math.round(movingAverage),
            });
        }
        return forecast
    }

    return []
}



module.exports = {predictExpenseForeCast}