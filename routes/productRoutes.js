import express from 'express'
import { getAllProducts } from '../controllers/productController'

const router = express.Router()

router.post("", getAllProducts)
router.post("/:id", getProduct)