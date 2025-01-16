import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const currentUserId = req.auth.userId;
		const users = await User.find({ clerkId: { $ne: currentUserId } });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};

export const createUser  = async (req, res, next) => {
  try {
    const { fullName, imageUrl, clerkId } = req.body;

    // Check if the user already exists
    const existingUser  = await User.findOne({ clerkId });
    if (existingUser ) {
      return res.status(400).json({ message: "User  already exists." });
    }

    // Create a new user if they do not exist
    const newUser  = new User({ fullName, imageUrl, clerkId });
    await newUser .save();

    res.status(201).json(newUser );
  } catch (error) {
    next(error);
  }
};