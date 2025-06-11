const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongooseConnection')
const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.set('view engine','ejs');

app.use('/owners', ownerRouter);
app.use('/product', productRouter);
app.use('/user', userRouter)

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
