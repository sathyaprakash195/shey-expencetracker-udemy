"use server";

import { connectMongoDB } from "@/config/db-connection";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectMongoDB();

export const GetLoggedInUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    // check if user exists in MongoDB
    const user = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    if (user) {
      return JSON.parse(JSON.stringify(user));
    }

    // if user does not exist in MongoDB, create a new user and return it
    let name, email, username, clerkUserId;
    name = clerkUser?.firstName + " " + clerkUser?.lastName;
    email = clerkUser?.emailAddresses[0]?.emailAddress;
    username = clerkUser?.username;
    clerkUserId = clerkUser?.id;

    const newUser = await UserModel.create({
      clerkUserId,
      name,
      email,
      username,
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const UpdateUser = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: any;
}) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
