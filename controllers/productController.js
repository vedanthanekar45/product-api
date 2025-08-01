import { randomUUID } from "crypto"
import fs from "fs"

const readDataFromFile = (path) => {
    const fileContent = fs.readFileSync(path, 'utf8');
    let products = JSON.parse(fileContent);
    return products
}


export const getAllProducts = async (req, res) => {
    try {
        res.json(readDataFromFile('./products.json'))
    } catch (error) {
        console.log("Error in getAllProducts controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product_list = readDataFromFile('./products.json')
        const product = product_list.find((p) => p.id === id)

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
        let product_list = readDataFromFile('./products.json')


        product_list.push(newProduct);
        const updatedData = JSON.stringify(product_list, null, 2);
        fs.writeFileSync('./products.json', updatedData, function (err) {
            if (err) {
                return console.log(err);
            }
        })


        res.status(201).json({
            "message": "New product successfully added!",
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

        let product_list = readDataFromFile('./products.json')
        const productIndex = product_list.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }

        const updatedProduct = {
            id: id,
            name,
            price,
            description,
        };

        product_list[productIndex] = updatedProduct;
        const updatedData = JSON.stringify(product_list, null, 2);
        fs.writeFileSync('./products.json', updatedData, function (err) {
            if (err) {
                return console.log(err);
            }
        })

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log("Error in updateProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


export const deleteProduct = (req, res) => {
    try {

        const { id } = req.params;
        let product_list = readDataFromFile('./products.json')
        const productExists = product_list.find((p) => p.id === id);

        product_list = product_list.filter((p) => p.id !== id);
        const updatedData = JSON.stringify(product_list, null, 2);
        
        fs.writeFile('./products.json', updatedData, function (err) {
            if (err) {
                return console.log(err);
            }
        })
        console.log(updatedData)
        res.status(204).send();

    } catch (error) {
        console.log("Error in deleteProduct controller: ", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
};