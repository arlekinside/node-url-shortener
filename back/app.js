import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';

import passport from 'passport';

import UsersRouter from './routes/usersRouter.js';
import User from './entities/user.js';
import LinksRouter from './routes/linksRouter.js';
import {__dirname} from './util/fileUtil.js';
import session from 'express-session';
import AuthRouter from './routes/authRouter.js';

dotenv.config();

console.log('===Init server config===');

const app = express();
const port = process.env.NODE_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.basename(__dirname), 'public')));


console.log('===Init auth config===');

let secret = process.env.AUTH_SECRET || 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#';
console.log(`Auth secret=${secret}`);

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 h
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


console.log('===Init routes config===');

app.use('/users', UsersRouter);
app.use('/links', LinksRouter);
app.use('/', AuthRouter);


console.log('===Init database config===');

const databaseUrl = `${process.env.DB_URL}/${process.env.DB_NANE}`;

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connected to db on ${databaseUrl}`)
    }).catch((err) => {
        console.error(`Error connecting to db on ${databaseUrl}`, err)
        process.exit(1);
    });


console.log('===Init port config===');

app.listen(port, '127.0.0.1', () => {
    console.log(`Listening port ${port}`)
});