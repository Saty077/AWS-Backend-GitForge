import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
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

    if (user) return res.status(400).json({ message: "user already exists" });

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
    res.status(500).json("something went wrong during signup");
  }
};

export const getAllUsers = async (req, res) => {
  res.send("getAllUsers called");
};

export const login = async (req, res) => {
  res.send("login called");
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
