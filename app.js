import express from 'express'
import productRotes from "./routes/productRoutes"

const app = express();
app.use(express.json())

app.use("/product", productRoutes)

port = 5000

app.listen(port, () => {
    console.log(`Server's running on port ${port}`)
})