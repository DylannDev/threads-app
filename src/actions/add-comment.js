"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addComment = async (formContent, postId) => {
  const session = await getServerSession(authOptions);

  // If the user is not logged in
  if (!session.user) {
    throw new Error("Vous devez vous connecter pour publier un thread");
  }

  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Add the comment to db
    await db.collection("comments").insertOne({
      associatedPostId: new ObjectId(postId),
      pseudo: session.user.pseudo,
      content: formContent,
      picture: session.user.picture,
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();

  revalidatePath("/");
};
