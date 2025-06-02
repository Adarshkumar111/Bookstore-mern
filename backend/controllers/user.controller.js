import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await createdUser.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = createdUser._doc;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword, // ✅ This is what frontend expects
    });
  } catch (error) {
    console.log("Error signup me hai:", error.message);
    res.status(500).json({
      message: "Signup server error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error loginn me hai ", error.message);
    res.status(500).json({
      message: "Login server error",
    });
  }
};
