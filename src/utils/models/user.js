import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
    }]
});


userSchema.pre('save', async function (next) {
    try {
        const existingUser = await UserModel.findOne({ email: this.email });

        if (existingUser) {
            throw new Error('User already registered');
        }
        next();
    } catch (error) {
        next(error);
    }
});
const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;

