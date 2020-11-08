import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password less than 5 characters'],
        select: false
        
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: [true, 'Role must be selected for user'],
        trim: true,
        enum: ['admin', 'client'],
        lowercase: true
    }
}, {timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
  });
  
  userSchema.methods.checkPassword = async function(inputPassword, userPassword) {
    return await bcrypt.compare(inputPassword, userPassword);
  };
  
  userSchema.index({ username: 'text' });
  
  userSchema.set('toJSON', {
    transform: (doc, final) => {
      delete final.__v;
    }
  });

const User = mongoose.model('User', userSchema)

export default User;
