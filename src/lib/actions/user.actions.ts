"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUsers() {
  try {
    connectToDB();

    return await User.find();
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function createUser(username: string) {
  try {
    connectToDB();

    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username already exists");
    }
    // throw new Error(" error");
    await User.create({ id: Math.random() * 100, username });

    revalidatePath("/");
    return "User created";
  } catch (error: any) {
    if (error.message.includes("Username already exists")) {
      return { error: "Username already exists" };
    } else {
      revalidatePath("/");
      return { error: `Failed to create user: ${error.message}` };
    }
  }
}
