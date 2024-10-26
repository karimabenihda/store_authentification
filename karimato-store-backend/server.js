const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/checkout', (req, res) => {
    const { username, cartItems } = req.body;

    const usersFilePath = path.join(__dirname, 'users', 'users.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading users.json' });
        }

        const usersData = JSON.parse(data);
        const userIndex = usersData.users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            usersData.users[userIndex].orders = usersData.users[userIndex].orders || [];
            usersData.users[userIndex].orders.push({
                cartItems,
                totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                                                   timestamp: new Date().toISOString(),
            });

            fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error writing to users.json' });
                }
                res.status(200).json({ message: 'Order details saved successfully' });
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
