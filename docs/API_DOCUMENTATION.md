# API Documentation for StellarMart

## Introduction
This documentation provides a comprehensive overview of the REST API endpoints available in the StellarMart application. Each endpoint will detail its functionality, parameters, and response formats.

## Base URL
The base URL for accessing the API is: `https://api.stellarmart.com/v1`

## Endpoints

### 1. User Authentication
#### POST /auth/login
- **Description**: Authenticate a user and return a token.
- **Request Body**:
  - `email`: User's email.
  - `password`: User's password.
- **Response**:
  - `200 OK`: Returns user details and authentication token.
  - `401 Unauthorized`: Invalid credentials.

#### POST /auth/register
- **Description**: Register a new user account.
- **Request Body**:
  - `name`: User's full name.
  - `email`: User's email.
  - `password`: User's password.
- **Response**:
  - `201 Created`: User registration success.
  - `400 Bad Request`: Validation errors.

### 2. Product Management
#### GET /products
- **Description**: Retrieve a list of all products.
- **Response**:
  - `200 OK`: Returns an array of products.

#### POST /products
- **Description**: Add a new product.
- **Request Body**:
  - `name`: Product name.
  - `description`: Product description.
  - `price`: Product price.
- **Response**:
  - `201 Created`: Product created successfully.
  - `400 Bad Request`: Validation errors.

#### PUT /products/{id}
- **Description**: Update an existing product.
- **Parameters**:
  - `id`: Product ID.
- **Request Body**:
  - Optional fields to update.
- **Response**:
  - `200 OK`: Product updated successfully.
  - `404 Not Found`: Product ID does not exist.

#### DELETE /products/{id}
- **Description**: Delete a product.
- **Parameters**:
  - `id`: Product ID.
- **Response**:
  - `204 No Content`: Product deleted successfully.
  - `404 Not Found`: Product ID does not exist.

### 3. Order Management
#### POST /orders
- **Description**: Create a new order.
- **Request Body**:
  - `product_id`: ID of the product being ordered.
  - `quantity`: Number of units ordered.
- **Response**:
  - `201 Created`: Order created successfully.

#### GET /orders
- **Description**: Retrieve a list of all orders.
- **Response**:
  - `200 OK`: Returns an array of orders.

### 4. User Profile
#### GET /users/{id}
- **Description**: Retrieve user profile information.
- **Parameters**:
  - `id`: User ID.
- **Response**:
  - `200 OK`: Returns user details.

### Conclusion
This API allows for complete management of product and user functionalities within the StellarMart application. Further enhancements and endpoints can be included based on feature requests and user feedback.
