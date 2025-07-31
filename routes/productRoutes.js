import express from 'express'
import { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

router.get("", getAllProducts)
router.post("", addProduct)
router.get("/:id", getProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router