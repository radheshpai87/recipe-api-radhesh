const express = require('express');
const cors = require('cors');
const recipieRoutes = require('./routes/recipeRoutes');

const app = express(); //Initialize express app
const PORT = 3000;

//Middleware
app.use(cors()); //Enable CORS for all routes
app.use(express.json()); //Middleware to parse JSON bodies
app.use('/api/recipes', recipieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});