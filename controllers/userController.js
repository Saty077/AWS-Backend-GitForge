import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
import httpStatus from "http-status";
configDotenv();

let client;
let uri = process.env.MONGO_URL;

const connectClient = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
};

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("gitForgeDB");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });

    if (user)
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign({ id: result.userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(result.userId);

    res.json({ token });
  } catch (err) {
    console.error("Error occured while signing up", err.message);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json("something went wrong during signup");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("gitForgeDB");
    const userCollection = db.collection("users");

    if (!email || !password) {
      return res.json({ message: "Please enter username and password" });
    }

    const user = await userCollection.findOne({ email });

    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });

    const auth = await bcrypt.compare(password, user.password);

    if (!auth)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token, usreId: user._id });
  } catch (err) {
    console.error("Error logging in:", err.message);
  }
};

export const getAllUsers = async (req, res) => {
  res.send("getAllUsers called");
};

export const getUserProfile = async (req, res) => {
  res.send("getUserProfile called");
};
export const updateUserProfile = async (req, res) => {
  res.send("updateUserProfile called");
};
export const deleteUserProfile = async (req, res) => {
  res.send("deleteUserProfile called");
};
