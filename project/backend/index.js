const express = require('express')
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer = require('multer')
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const connectDB = async()=>{
    try{
        const conn =await  mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Database ${conn.connection.host}`); 
    }
    catch(e){
        console.log(`Error : ${e}`);
    }
}

const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
connectDB();

const port = process.env.PORT || 4000;

// mongoose.connect('mongodb+srv://stuffhack92:stuffhack92@campusmarket.guutbgq.mongodb.net/top')


app.get('/', (req, res) => {
    res.send('hello rutu')
})

app.get('/search', productController.search)
app.post('/like-product', userController.likeProducts)
app.post('/add-product', upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), productController.addProduct)
app.get('/get-products', productController.getProducts)
app.get('/get-product/:pId', productController.getProductsById)
app.post('/liked-products', userController.likedProducts)
app.post('/my-products', productController.myProducts)
app.post('/signup', userController.signup)
app.get('/my-profile/:userId', userController.myProfileById)
app.get('/get-user/:uId', userController.getUserById)
app.post('/login', userController.login)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
