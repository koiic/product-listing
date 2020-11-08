import  express  from 'express'
import mongoose from 'mongoose';
import session from 'express-session'

import indexRouter from './routes/index';
import authRouter from './routes/auth'
import productRouter from './routes/product'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);



app.use(session({ secret: 'secret', saveUninitialized: false, resave: false, cookie: { maxAge: 1000 } }));


let dbUrl = process.env.DATABASE_URL

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Db connection successful'));


const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`API running on localhost:${port}`))