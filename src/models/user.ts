import { Schema, model } from 'mongoose';
import { UserDocument } from '../types/user.interface';
import validator from 'validator';
import bcryptsjs from 'bcryptjs';

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: [true, 'Email is require'],
        validate: [validator.isEmail, 'Invalid email'],
        createIndexes: {unique: true}
    },
    username: {
        type: String,
        required: [true, 'Username is required'],       
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,    
    },
},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcryptsjs.genSalt(10);
        this.password = await bcryptsjs.hash(this.password, salt);
        return next();
    } catch(err) {
        return next(err as Error);
    }
});

userSchema.methods.validatePassword = function (password: string) {
    return bcryptsjs.compare(password, this.password);
}

export default model<UserDocument>('User', userSchema);