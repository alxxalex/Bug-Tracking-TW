import { User } from "../models/user.js";

const insertUserIntoDb = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUsersFromDb = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  console.log("Out");
  const user = await User.findByPk(req.params.userId);
  if (user) {
    console.log(user);
    const updatedUser = await user.update(req.body);
    return res.status(200).json(updatedUser);
  } else {
    return res
      .status(404)
      .json({ error: `User with id ${req.params.userId} not found` });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { insertUserIntoDb, getUsersFromDb, authenticateUser, updateUser };
