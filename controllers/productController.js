import { randomUUID } from "crypto"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";
export let product = []

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, '../products.json');

const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const writeDataToFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2))
};

let products = readDataFromFile();

export const getAllProducts = async (req, res) => {
    try {
        res.json(products)
    } catch (error) {
        console.log("Error in getAllProducts controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
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
        const { name, price, description } = req.body
        const newProduct = {
            id: randomUUID(),
            name,
            price,
            description
        }
        product.push(newProduct);
        writeDataToFile(products);
        res.status(201).json({
            "message": "New product successfully added!"
        })

    } catch (error) {
        console.log("Error in addProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, description } = req.body

        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }

        if (!name || !price || !description) {
            return res.status(400).send('Name, price, and description are required.');
        }

        const updatedProduct = {
            id: id,
            name,
            price,
            description,
        };

        products[productIndex] = updatedProduct;

        writeDataToFile(products);

        res.json(updatedProduct);

    } catch (error) {
        console.log("Error in updateProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const productExists = products.find((p) => p.id === id);
  if (!productExists) {
    return res.status(404).send('Product not found');
  }
  products = products.filter((p) => p.id !== id);
  writeDataToFile(products);

  res.status(204).send();
};