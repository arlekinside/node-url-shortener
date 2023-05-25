import mongoose from 'mongoose';
import User from './user.js';

const linkSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: User.modelName,
        required: true
    }
})

export default mongoose.model('Link', linkSchema);