# product-api

A simple RESTful API built with Node.js and Express to manage a product inventory. 

## Installation and Setup

Follow these steps to get the server running on your local machine.

1.  **Clone the repository** (or set up your project files):

    ```bash
    git clone https://github.com/vedanthanekar45/product-api.git
    cd product-api
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the server in development mode**:
    This command uses `nodemon` to automatically restart the server when you make changes to the code.

    ```bash
    npm run dev
    ```

The server will be running at `http://localhost:5000`.

-----

## API Guide

### Get All Products

  * **Endpoint**: `GET /products`
  * **Description**: Retrieves a list of all products.
  * **Success Response**:
      * **Code**: `200 OK`
      * **Content**:
        ```json
        [
            { "id": "p1", "name": "Laptop", "price": 120000, "description": "For work" },
            { "id": "p2", "name": "Coffee Mug", "price": 400, "description": "Kitchenware" }
        ]
        ```

### Get a Single Product

  * **Endpoint**: `GET /products/:id`
  * **Description**: Retrieves a single product by its unique ID.
  * **Success Response**:
      * **Code**: `200 OK`
      * **Content**:
        ```json
        { "id": "p1", "name": "Laptop", "price": 120000, "description": "For work" },
        ```
  * **Error Response**:
      * **Code**: `404 Not Found`
      * **Content**: `Product not found`

### Create a New Product

  * **Endpoint**: `POST /products`
  * **Description**: Adds a new product to the inventory.
  * **Request Body**:
    ```json
    {
        "name": "Wireless Mouse",
        "price": 700,
        "description": "Electronics"
    }
    ```
  * **Success Response**:
      * **Code**: `201 Created`
      * **Content**: The newly created product object with a generated `id`.
        ```json
        { "id": "...", "name": "Wireless Mouse", "price": 700, "description": "Electronics" }
        ```

### Update a Product

  * **Endpoint**: `PUT /products/:id`
  * **Description**: Replaces an existing product's data entirely.
  * **Request Body**:
    ```json
    {
        "name": "Upgraded Laptop",
        "price": 135000,
        "description": "A newer, faster model."
    }
    ```
  * **Success Response**:
      * **Code**: `200 OK`
      * **Content**: The full, updated product object.

### Delete a Product

  * **Endpoint**: `DELETE /products/:id`
  * **Description**: Deletes a product by its unique ID.
  * **Success Response**:
      * **Code**: `204 No Content`
  * **Error Response**:
      * **Code**: `404 Not Found`
      * **Content**: `Product not found`