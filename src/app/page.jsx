import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Footer from "@/components/Footer/Footer";
import Posts from "@/components/Posts/Posts";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import { MongoClient } from "mongodb";

export default async function Index() {
  const session = await getServerSession(authOptions);

  let posts, client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Select the "posts" collection
    posts = await db
      .collection("posts")
      .find()
      .sort({ creation: -1 })
      .toArray();

    // Format posts
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));
  } catch (e) {
    throw new Error(e);
  }

  await client.close();

  return (
    <ConnectedLayout>
      <div className="md:w-[700px] w-full mx-auto mt-10">
        {session?.user && (
          <div className="border-b border-threads-gray-dark py-4">
            <NewPostForm />
          </div>
        )}
        {posts.map((post) => (
          <Posts key={post._id} post={post} />
        ))}
      </div>
    </ConnectedLayout>
  );
}
