const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: "Admin", email: "admin@gmail.com", password: "password123" }
];

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: "Full Name is required." });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: "A valid email address is required." });
  }

  const cleanEmail = email.toLowerCase().trim();
  const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (existingUser) {
    return res.status(400).json({ message: "An account with this email already exists. Please log in." });
  }

  if (!password || password.trim().length < 4) {
    return res.status(400).json({ message: "Password must be at least 4 characters." });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: name.trim(),
    email: cleanEmail,
    password: password.trim()
  };

  users.push(newUser);

  res.status(201).json({
    message: "Account created successfully!",
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter both email/username and password." });
  }

  const query = email.toLowerCase().trim();
  const pass = password.trim();

  const user = users.find(
    (u) =>
      (u.email.toLowerCase() === query || u.name.toLowerCase() === query) &&
      u.password === pass
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email/username or password." });
  }

  res.status(200).json({
    message: "Login successful!",
    user: { id: user.id, name: user.name, email: user.email }
  });
});

module.exports = router;
