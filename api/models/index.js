import mongoose from 'mongoose';

import User from './User';
import Favourite from './Favourite';

const connectDb = () => {
    return mongoose.connect(process.env.DB_URI);
}

const models = { User, Favourite };

export { connectDb };

export default models;