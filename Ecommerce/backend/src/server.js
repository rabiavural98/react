require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS if needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');

const categoryRoutes = require('./routes/dashboard/categoryRoutes');
const productRoutes = require('./routes/dashboard/productRoutes');


// Use routes
app.use('/api',testRoutes);
app.use('/api',authRoutes);

app.use('/api',require('./routes/dashboard/categoryRoutes'))
app.use('/api',require('./routes/dashboard/productRoutes'))



app.use(bodyParser.json())
app.use(cookieParser());

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


app.get('/',(req,res)=>res.send('My backend'))

// Add other routes usage here

// Set the server to listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));