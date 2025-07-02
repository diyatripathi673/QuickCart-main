// config/ingest.js

import { Inngest } from "inngest";
import connectToDB from "./db";
import User from "@/models/User";

// Initialize the Inngest client
export const inngest = new Inngest({ id: "quickcart-next" });

// Function: Save new user
export const saveUserData = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_address, img_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_address[0].email_address,
      imgUrl: img_url,
      cartItems: {},
    };

    await connectToDB();
    await User.create(userData);

    return { success: true };
  }
);

// Function: Update user
export const updateUserData = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_address, img_url } = event.data;

    const userData = {
      name: `${first_name} ${last_name}`,
      email: email_address[0].email_address,
      imgUrl: img_url,
    };

    await connectToDB();
    await User.findByIdAndUpdate(id, userData, { new: true });

    return { success: true };
  }
);

// Function: Delete user
export const deleteUserData = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectToDB();
    await User.findByIdAndDelete(id);

    return { success: true };
  }
);

// ✅ Export all functions as an array
export const functions = [saveUserData, updateUserData, deleteUserData];
