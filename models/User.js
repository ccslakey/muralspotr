import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;



const UserSchema = new mongoose.Schema({ 
    name: { type: String, required: true, index: { unique: true }},
    email: String,
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    admin: Boolean,
    password: String,
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }],
    submissions: Number
});

UserSchema.pre('save', () => {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
    
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', UserSchema);
export default User;
