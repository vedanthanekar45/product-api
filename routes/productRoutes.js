import express from 'express'
import { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, searchProduct } from '../controllers/productController.js'

const router = express.Router()

router.get("", getAllProducts)
router.post("", addProduct)
router.get("/search", searchProduct)
router.get("/:id", getProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router