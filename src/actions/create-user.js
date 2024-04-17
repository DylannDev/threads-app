"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-email-syntax";

export const createUser = async (username, pseudo, email, password) => {
  // Check if a field is empty
  if (!username || !pseudo || !email || !password) {
    return toast.error("Vous devez remplir tous les champs !");
  }

  // Check if the email is valid
  if (!checkEmail(email)) {
    return toast.error("Veuillez entrer un email valide");
  }

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // 1 - Check if email is already in db
    // Select the "users" collection
    let user = await db.collection("users").find({ email }).limit(1).toArray();

    // If the email is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("Cet email est déjà utilisé");
    }

    // 2 - Check if pseudo is already used
    // Select the "users" collection
    user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    // If the pseudo is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("Ce pseudo est déjà utilisé");
    }

    // 3 - Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // 4 - Create the user
    await db.collection("users").insertOne({
      username,
      pseudo,
      email,
      password: encryptedPassword,
      picture: "/picture.png",
      bio: "-",
      url: "dylann-dev.com",
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
