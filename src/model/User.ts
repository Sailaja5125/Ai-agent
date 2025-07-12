import mongoose, { Schema } from 'mongoose'

// using an email verification and all we will decide later 
interface User {
    email:string;
    password: string;

}

const userSchema = new Schema<User>({
    email:{
        type: String,
        required: [true,"Email is required"],
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,"Password must contain at least one Uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long"], 
        minlength: [8,"Password must be atleast 8 characters"]
    }
}, {timestamps:true})

export const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model("User",userSchema)