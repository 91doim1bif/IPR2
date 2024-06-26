const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const { User } = require("./database/models");
const cookieSession = require("cookie-session");

const app = express();

// Set environment variables directly in the code
const MONGODB_URI =
  "mongodb+srv://mikailaktuerk99:fU01ACNxVMCzuiP6@customer.p3usn7i.mongodb.net/?retryWrites=true&w=majority&appName=Customer";
const JWT_SECRET = "JWT-SECRET";
const GOOGLE_CLIENT_ID =
  "110894858120-a6j1a5asvt2ubb1gk558a17ts0fp9mpn.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "Ov23liVOK2gky6X51zBF";
const GITHUB_CLIENT_SECRET = "022b6a4991c9356b8f26ac2f485a643b3606514d";
const FRONTEND_URL = "http://localhost:3000";
const SESSION_SECRET = "SESSION_SECRET";
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, //ms
//     keys: [SESSION_SECRET],
//   })
// );

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3080/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
      }
      return done(null, user);
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ email: profile.username + "@mail.de" });
      if (!user) {
        user = await new User({
          userId: profile.id,
          name: profile.displayName,
          email: profile.username + "@mail.de",
        }).save();
      }
      return done(null, user);
    }
  )
);

// CORS options
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const moiveRoutes = require("./routes/movies");
const favoriteRoutes = require("./routes/favorites");
const historieRoutes = require("./routes/history");
app.use("/api", historieRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", moiveRoutes);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);

// OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth" }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Define MongoDB connection URI
mongoose
  .connect(MONGODB_URI, {
    dbName: "test",
  })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
