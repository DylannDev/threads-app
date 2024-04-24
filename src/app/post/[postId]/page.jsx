"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostId() {
  const params = useParams();
  const postId = params.postId;

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSelectedPost();
  }, []);

  const fetchSelectedPost = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Une erreur est survenue");
      }

      setPost(data.post);
      setComments(data.comments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConnectedLayout>
      <div className="md:w-[700px] w-full mx-auto mt-10">
        {loading && <p className="text-white text-center">Chargement...</p>}
        {error && <div className="text-white text-center">Error: {error}</div>}
        {post && (
          <Posts
            post={post}
            commentsCount={comments.length}
            countLikes={post.likes ? post.likes.length : 0}
          />
        )}
        {comments &&
          comments.map((comment) => <Posts key={comment._id} post={comment} />)}
      </div>
    </ConnectedLayout>
  );
}
