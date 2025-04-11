const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect('mongodb+srv://srikrish2705guru:efLuDW3o6JyiT4Ez@biller.1ka7i.mongodb.net/biller?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Serve main HTML page
app.get('/', (req, res) => {
  res.render('main'); // views/main.html
});

// Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).send({ success: false, message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.send({ success: true, message: "Signup successful" });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ success: false, message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).send({ success: false, message: "Invalid password" });
  }

  res.send({ success: true, message: "Login successful", name: user.name, email: user.email });
});

// Reset (simulated)
app.post('/reset', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ name, email });
  if (!user) return res.status(404).send({ message: "No matching user found" });

  res.send({ message: "OTP sent to email (simulated)" });
});

// Get user profile
app.get('/profile', async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }

  res.send({
    success: true,
    data: {
      name: user.name,
      email: user.email,
      password: "" // don't send password hash
    }
  });
});


app.post('/update-profile', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    user.name = name;
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.send({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
