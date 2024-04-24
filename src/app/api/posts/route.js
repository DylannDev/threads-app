import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get the pseudo from the request body
  const data = await request.json();
  const { postId } = data;
  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // 1 - Get post
    let post = await db
      .collection("posts")
      .find({ _id: new ObjectId(postId) })
      .limit(1)
      .toArray();

    if (!post) {
      throw new Error("Ce thread n'existe pas");
    }

    // Formatting
    post = post.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }))[0];

    // 2 - Get the associated comments
    let comments = await db
      .collection("comments")
      .find({ associatedPostId: new ObjectId(postId) })
      .toArray();

    await client.close();

    return NextResponse.json(
      {
        post,
        comments,
      },
      { status: 200 }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
