import { randomUUID } from "crypto"
import { products } from "../models/products"

export let products = []

export const getAllProducts = async (res) => {
    try {
        res.json(products)
    } catch (error) {
        console.log("Error in getAllProducts controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = products.find((p) => p.id === id)

        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product)

    } catch (error) {
        console.log("Error in getProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const addProduct = async (req, res) => {
    try {
        const {name, price, description} = req.body
        const newProduct = {
            id: randomUUID(),
            name,
            price,
            description
        }

        products.push(newProduct)
        res.status(201).json({
            "message": "New product successfully added!"
        })
        
    } catch (error) {
        console.log("Error in addProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}