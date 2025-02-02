const getDateAggregationRule = (startDate, endDate) => {
    let dataAggregation = {};
    if (startDate && endDate) {
        dataAggregation = {
            date: {  // Ensure this field matches your database
                $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)), // Start of the day
                $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)), // End of the day
            },
        };
    }
    return dataAggregation;
};

module.exports = { getDateAggregationRule };
