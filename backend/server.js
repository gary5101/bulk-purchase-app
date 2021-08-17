const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});
let vendorProductReadyRoutes=require('./routes/vendorProductReady')
let vendorReviewRoutes=require('./routes/vendorReview');
let specificProductRoutes=require('./routes/specificProduct')
let productReviewsRoutes =require('./routes/productReviews');
let vendorProductDispatchedRoutes =require('./routes/vendorProductDispatched')
let vendorProductRoutes = require('./routes/vendorProduct');
let vendorAuthRoutes =require('./routes/vendorAuth');
let customerAuthRoutes =require('./routes/customerAuth');
let customerRoutes =require('./routes/customer');
let vendorRoutes = require('./routes/vendor');
let productRoutes = require('./routes/product');
let orderRoutes =require('./routes/order');
let orderReviewRoutes =require('./routes/orderReview');

app.use('/api/vendor/review',vendorReviewRoutes);
app.use('/api/product/specific',specificProductRoutes)
app.use('/api/product/reviews',productReviewsRoutes);
app.use('/api/vendor/product/ready',vendorProductReadyRoutes)
app.use('/api/vendor/product/dispatched',vendorProductDispatchedRoutes);
app.use('/api/vendor/product',vendorProductRoutes);
app.use('/api/vendor/auth',vendorAuthRoutes);
app.use('/api/customer/auth',customerAuthRoutes);
app.use('/api/product',productRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/vendor',vendorRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/order/review',orderReviewRoutes)
app.use('/', userRoutes);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});

