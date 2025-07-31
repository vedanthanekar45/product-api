import express from 'express'
import productRoutes from "./routes/productRoutes.js"

const app = express();
app.use(express.json())

app.use("/product", productRoutes)

let port = 5000

app.listen(port, () => {
    console.log(`Server's running on port ${port}`)
})