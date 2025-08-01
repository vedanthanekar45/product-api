import fs from 'fs'

var products;

function read() {
    const fileContent = fs.readFileSync('./products.json', 'utf8');
    products = JSON.parse(fileContent);
    console.log(products)
}

read()

const newProduct = {
  id: 'a4b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
  name: 'Desk Lamp',
  price: 45,
  description: 'A modern LED desk lamp',
};

products.push(newProduct);
const updatedData = JSON.stringify(products, null, 2);
fs.writeFile('./products.json', updatedData, function(err) {
    if(err) {
        return console.log(err);
    }
})

console.log("After writing: \n", products)