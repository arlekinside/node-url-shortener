import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);