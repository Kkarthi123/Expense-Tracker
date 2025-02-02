const getDateAggregationRule = (startDate, endDate)=>{
    let dataAggregation = {};
    if(startDate && endDate){
      dataAggregation = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }
    }

    return dataAggregation;
}

module.exports = {getDateAggregationRule}