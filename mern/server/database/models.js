const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Profile schema
const ProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  favoriteIds: [],
  historyIds: [],
});

// Define the Account schema
const AccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  session_state: { type: String },
});

// Create a compound unique index for provider and providerAccountId
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Define the VerificationToken schema
const VerificationTokenSchema = new Schema({
  identifier: { type: String, required: true },
  token: { type: String, unique: true, required: true },
  expires: { type: Date },
});

// Ensure uniqueness on identifier and token together
VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

// Define the Movie schema
const MovieSchema = new Schema({
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  genre: { type: String },
  duration: { type: String },
});

// Define the User schemad
const UserSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, index: true },
  profiles: [ProfileSchema],
  // favoriteIds: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Movie",
  //     default: undefined,
  //   },
  // ],
  // verificationTokens: {
  //   type: [VerificationTokenSchema],
  //   default: undefined,
  //   unique: true,
  // },
  // accounts: { type: [AccountSchema], default: undefined, unique: true },
});

// Cascade delete for related entities when a user is removed
UserSchema.pre("remove", function (next) {
  this.model("VerificationToken").deleteMany({ userId: this._id }).exec();
  this.model("Account").deleteMany({ userId: this._id }).exec();
  next();
});

// Define the models with specific collection names
const Account = mongoose.model("Account", AccountSchema);
const Profile = mongoose.model("Profile", ProfileSchema);
const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema,
  "verificationTokens"
);
const Movie = mongoose.model("Movie", MovieSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Account, VerificationToken, Movie, User, Profile };
