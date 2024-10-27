

# KIL Shopping Cart

KIL Shopping Cart is a full-featured e-commerce web application built with React, Redux, and Redux Toolkit. It allows users to browse items, manage their shopping cart, and complete purchases via a checkout system. The application includes user authentication, role-based access control, and persistent cart management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **User Authentication**: Login and logout with role-based access control for users.
- **Cart Management**: Add, increment, decrement, and remove items from the cart.
- **Checkout**: Save cart items and order details at checkout.
- **Persistent Cart Data**: Cart data persists using local storage and backend for user sessions.
- **Item Summary**: View a list of items with images, price, and quantity management.

## Technologies Used

- **Frontend**: React, Redux, Redux Toolkit, React Router, Bootstrap
- **Backend**: Node.js, Express, File-based storage (JSON)

## Project Structure

```
.
├── backend/                   # Node.js backend server
│   ├── server.js              # Main server file
│   └── routes                 # API routes for authentication, cart, and checkout
│
├── frontend/                  # Frontend React app
│   ├── src
│   │   ├── components         # Components (Navbar, CartList, etc.)
│   │   ├── reducers           # Redux slices (authSlice, cartSlice)
│   │   └── users/users.json   # User data file
│
├── README.md                  # Project documentation
└── package.json               # Project metadata and dependencies
```

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/karimabenihda/kil-shopping-cart.git
    ```

2. Navigate into the project directory:

    ```bash
    cd kil-shopping-cart
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    cd karimato-store
    npm install
    cd ../karimato-store-backend
    npm install
    ```

4. Start both the backend server and the frontend app:

    ```bash
    cd karimato-store
    npm start       # Starts backend server on http://localhost:3001
    cd ../karimato-store-backend
    npm start       # Starts frontend app on http://localhost:3000
    ```

## Usage

1. **Sign Up / Log In**: Access the application by logging in with provided credentials in `users.json`.
2. **Browse Products**: Browse items and add them to your cart.
3. **Manage Cart**: Add items, increase/decrease quantities, or remove items from the cart.
4. **Checkout**: Complete the purchase, and view checkout details in the backend.

## API Routes

### **User Authentication**

- **POST /auth/login**: Authenticate user and start session.
- **POST /auth/logout**: End user session and clear local storage.

### **Cart and Checkout**

- **GET /cart**: Fetch cart items for the current user.
- **POST /checkout**: Submit cart details for checkout.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

A special thank you to [karimabenihda](https://github.com/karimabenihda) for providing invaluable assistance in the development of this project.


