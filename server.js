// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const path = require('path');
const themeRoutes = require('./routes/themeRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

// ----------------------------------------
// CONNECT DB (solo una vez)
// ----------------------------------------
connectDB();

// ----------------------------------------
// Middleware
// ----------------------------------------
app.use(cors());
app.use(express.json());

// Serve homepage
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ----------------------------------------
// Auth Routes
// ----------------------------------------
app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// ----------------------------------------
// API Routes
// ----------------------------------------
app.use('/api/themes', themeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Portfolio API is running' });
});

// ----------------------------------------
// 404 Handler
// ----------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ----------------------------------------
// Global Error Handler
// ----------------------------------------
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ----------------------------------------
// START SERVER ONLY IF NOT IN TEST MODE
// ----------------------------------------
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ----------------------------------------
// EXPORT APP FOR TESTING
// ----------------------------------------
module.exports = app;
