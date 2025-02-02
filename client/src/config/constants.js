const PaymentMode = Object.freeze({
    0: "Credit",
    1: "Debit",
    2: "Cash"
})

const TransactionType = Object.freeze({
    Income : 0,
    Expenses : 1
})


const ExportType = Object.freeze({
    csv: 1,
    xlsx: 2
})


const TransactionCategories = Object.freeze([
    { id: 0, name: "Groceries", iconClass: "fa fa-shopping-cart"},
    { id: 1, name: "Rent", iconClass: "fa fa-home" },
    { id: 2, name: "Salary", iconClass: "fa fa-money" },
    { id: 3, name: "Entertainment", iconClass: "fa fa-film" },
    { id: 4, name: "Utilities", iconClass: "fa fa-lightbulb-o" },
    { id: 5, name: "Healthcare", iconClass: "fa fa-heartbeat" },
    { id: 6, name: "Travel", iconClass: "fa fa-plane" },
    { id: 7, name: "Education", iconClass: "fa fa-graduation-cap" },
    { id: 8, name: "Dining", iconClass: "fa fa-cutlery" },
    { id: 9, name: "Shopping", iconClass: "fa fa-shopping-bag" },
    { id: 10, name: "Miscellaneous", iconClass: "fa fa-ellipsis-h" }
]);

export {
    PaymentMode,
    TransactionType,
    TransactionCategories,
    ExportType
}
