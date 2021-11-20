const express = require('express')
const cookieparser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv=require('dotenv');
const passport = require('passport');

dotenv.config();

const authRouter = require('./routes/auth');
const foodRouter = require('./routes/food');
const combinationRouter = require('./routes/combination');
const searchRouter = require('./routes/search');

const {sequelize}=require('./models');

const passportConfig = require('./passport/index');

const app=express();
passportConfig();

app.set('port',process.env.PORT||8001);

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터 베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);
app.use('/food',foodRouter);
app.use('/combination',combinationRouter);
app.use('/search',searchRouter);

app.use((req,res,next)=>{
    const error=new Error(`${req.method} ${req.url}라우터가 없습니다.`);
    error.status=404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error=process.env.NODE_ENV !=='production'? err:{};
    res.status(err.status||500);
    res.json({error:res.locals.message})
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});