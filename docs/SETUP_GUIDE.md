# Setup Guide for StellarMart

## Introduction
This guide provides detailed instructions for setting up both the frontend and backend of the StellarMart application.

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version 14 or later)
- npm (Node package manager)
- Git
- MongoDB (for backend)

## Backend Setup

### Step 1: Clone the Repository
Open your terminal and run the following command to clone the repository:
```bash
git clone https://github.com/tourff/stellarmartBd.git
cd stellarmartBd
```

### Step 2: Install Dependencies
Once you are in the backend directory, install the required dependencies:
```bash
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

### Step 4: Start the Backend Server
You can start your backend server using the following command:
```bash
npm run start
```
The server should be running on `http://localhost:5000`.

## Frontend Setup

### Step 1: Navigate to the Frontend Directory
In your terminal, navigate to the frontend directory (usually within the project folder):
```bash
cd ../frontend
```

### Step 2: Install Dependencies
Install the required dependencies for the frontend:
```bash
npm install
```

### Step 3: Configuration
If necessary, update the API base URL in your environment configuration file (e.g., `.env` or `config.js`) pointing to the backend server.

### Step 4: Start the Frontend Server
To start the frontend application, run:
```bash
npm start
```
The frontend should now be running on `http://localhost:3000`.

## Conclusion
You should now have both the frontend and backend of the StellarMart application running locally. If you encounter any issues, please check the project documentation or reach out for support.