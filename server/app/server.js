const express = require("express");
const connectDb = require("./db-config/db");
const transactionsRouter = require('./routes/transactions');
const cors = require("cors");
const dashboardRouter = require("./routes/dashboard");
const AuthRouter = require("./routes/auth");
const authHandler = require("./middleware/authHandler");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const TransactionsModel = require("./models/transactionsModel");
const { default: mongoose } = require("mongoose");
const {faker } = require("@faker-js/faker");
const ProfileRouter = require("./routes/profile");



const app = express();
const port = process.env.PORT || 5000

connectDb()
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(cookieParser())

//tranactions
app.use("/api/transactions", authHandler ,transactionsRouter);

//dashboard
app.use("/api/dashboard",  authHandler, dashboardRouter);

//auth
app.use("/api/auth", AuthRouter);


//profile
app.use("/api/profile", authHandler, ProfileRouter)




app.post("/testData", async (req, res) => {
   try {
    const randomTransactions = Array.from({ length: 90 }, () => ({
        userId: new mongoose.Types.ObjectId("67607fb7e09dc3124ddca125"),
        type: faker.helpers.arrayElement([0, 1]),
        category: faker.helpers.arrayElement(["Groceries", "Rent", "Salary", "Entertainment", "Utilities", "Healthcare", "Travel", "Education", "Dining", "Shopping"]),
        amount: parseFloat(faker.finance.amount(10, 5000, 2)),
        description: faker.lorem.sentence(),
        paymentMode: faker.helpers.arrayElement([0, 1, 2]),
        date: faker.date.between({ from: new Date("2024-01-01"), to: new Date("2024-12-31") })
    }));

    
    const result = await TransactionsModel.insertMany(randomTransactions);
    res.json({message: "data Uploaded", randomTransactions})
   } catch (error) {

    console.log(error)

      res.send(error)
   }
});


app.listen(port, ()=>{
    console.log("Running in 5000")
})