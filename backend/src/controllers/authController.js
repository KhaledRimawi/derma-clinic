const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not configured");
    error.statusCode = 500;
    throw error;
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const formatUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  gender: user.gender,
  age: user.age,
  phone: user.phone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const registerPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, age, phone } =
      req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "First name, last name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      role: "patient",
      gender,
      age,
      phone,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      message:
        error.statusCode === 500
          ? error.message
          : "Failed to register patient",
      error: error.statusCode === 500 ? undefined : error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 500
          ? error.message
          : "Failed to log in",
    });
  }
};

const getMe = async (req, res) => {
  return res.status(200).json({
    user: formatUser(req.user),
  });
};

module.exports = {
  registerPatient,
  login,
  getMe,
};
