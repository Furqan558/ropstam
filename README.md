# CRUD App + Ropstam Smart Contract

[Watch Loom Video: Project Explanation](https://www.loom.com/share/ca3564df8e5e4055851672a06c9d7f02?sid=a3b5f170-d4e9-4760-a9bf-be7fee22187b)

[Watch Loom Video: Smart Contract Explanation](https://www.loom.com/share/9c85b46f43fd4dbb9b8d02354b2db94f?sid=615f64f7-6c38-4668-a785-e518a87e2b8c)

Note: Smart Contract code in the above is in the Ropstam.sol file in the root directory of the project

The Car Management App is a web application built using Node.js, Express.js, MongoDB, and Bootstrap. This app allows users to manage a list of cars, including their make, model, color, and registration number. Users can add new cars, view the list of existing cars, edit car details, and delete cars as needed.

## Features

- Sign up and sign in using email/password or MetaMask.
- User authentication using JSON Web Tokens (JWT).
- CRUD operations for managing cars: Create, Read, Update, and Delete.
- User-friendly interface with Bootstrap styling.
- Secure password storage with bcrypt.

## Prerequisites

Before running the app, ensure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/car-management-app.git
cd car-management-app
```

2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a .env file in the root directory and add the following variables

```makefile
PORT=3000             # Specify the port for the server (default is 3000)
MONGODB_URI=          # Your MongoDB connection URI
JWT_SECRET=           # Secret key for JWT token generation
```

Start the server

```bash
npm start
```

The app should now be running at http://localhost:3000.

## Usage

Sign Up and Sign In
To create a new user account, click on the "Sign Up" button on the homepage. Enter your email and password to register.
Alternatively, you can sign up using MetaMask by clicking the "Sign Up with MetaMask" button and confirming the MetaMask transaction.

Sign In
To sign in with an existing email/password account, enter your credentials on the homepage and click "Sign In."
To sign in with MetaMask, ensure MetaMask is installed, and click "Sign In with MetaMask."

Car Management
After signing in, you will be redirected to the Car Management page, where you can view the list of existing cars and perform CRUD operations.

View Cars
The table displays the cars with their make, model, color, and registration number.
Each car row has "Edit" and "Delete" buttons for managing individual cars.

Add a Car
To add a new car, scroll down to the "Add New Car" section and enter the car's details (make, model, color, registration number).
Click the "Add Car" button to add the car to the list.

Edit a Car
To edit an existing car, click the "Edit" button in the corresponding row.
A modal dialog will appear with the car's details pre-filled.
Make the desired changes and click "Save Changes" to update the car's information.

Delete a Car
To delete a car, click the "Delete" button in the corresponding row.
A confirmation dialog will appear to confirm the deletion.
Click "OK" to delete the car permanently.
