import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get the pseudo from the request body
  const data = await request.json();
  const { pseudo } = data;
  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // 1 - Get user
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    if (!user) {
      throw new Error("Cet utilisateur n'existe pas");
    }

    // Formatting
    user = user.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }))[0];

    // SECOND: Get the posts
    let posts = await db
      .collection("posts")
      .find({ pseudo })
      .sort({ creation: -1 })
      .toArray();

    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));

    await client.close();

    return NextResponse.json(
      {
        user,
        posts,
      },
      { status: 200 }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
