const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const path = require('path');

const inventoryRoutes = require('./routes/inventoryRoutes')

const mongoose = require('mongoose');
const mongooseEndpoint = process.env['DB_URL'] || 'mongodb://localhost:27017/inventory-shopify-zhuocaili';



mongoose
  .connect(mongooseEndpoint, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));


app.use('/api/inventories', inventoryRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (process.env.NODE_ENV === "development") {
  const cors = require('cors');
  app.use(cors({
      origin: '*'
  }))
}

const port = process.env['PORT'] || 8000
app.listen(port , () => {console.log("App is live on: " + port)});