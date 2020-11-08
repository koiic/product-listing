import mongoose from 'mongoose';
import 'dotenv/config'
import User from './user';
import Product from './product';

const db = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};

const models = {User, Product}

export { db };

export default models;
