import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const { postId, action, userId } = data; // Nouvelle donnée "action" pour indiquer si c'est un like ou un dislike, et "userId" pour identifier l'utilisateur

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Récupérer le post
    let post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });

    if (!post) {
      throw new Error("Ce thread n'existe pas");
    }

    // Mettre à jour le nombre de likes
    if (action === "like") {
      // Vérifier si l'utilisateur n'a pas déjà liké le post
      const userLiked = post.likes.includes(userId);
      if (!userLiked) {
        // Ajouter l'ID de l'utilisateur aux likes du post
        await db
          .collection("posts")
          .updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: userId } }
          );
        // Mettre à jour le post avec le nouveau nombre de likes
        post.likes.push(userId);
      }
    } else if (action === "unlike") {
      // Supprimer l'ID de l'utilisateur des likes du post
      await db
        .collection("posts")
        .updateOne({ _id: new ObjectId(postId) }, { $pull: { likes: userId } });
      // Mettre à jour le post avec le nouveau nombre de likes
      post.likes = post.likes.filter((id) => id !== userId);
    }

    await client.close();

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (e) {
    await client.close();
    throw new Error(e.message);
  }
}
