import { User } from "../models/user.js"

const insertUserIntoDb = async (req,res) => {
    try {
        const newUser = await User.create(req.body)
        return res.status(200).json(newUser)
    } catch (err) {
        return res.status(500).json(err)
    }
} 

export {insertUserIntoDb}