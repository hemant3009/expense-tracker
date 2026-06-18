const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)

.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

app.get('/api/health', (req,res) => {
    res.json({message: 'Server is running'});
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500)
       .json({
        message: 'Something went wrong', 
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
        Expense Tracker Server Running!
        URL: http://localhost:${PORT}
    `);
});