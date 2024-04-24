"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { addComment } from "@/actions/add-comment";
import { createPost } from "@/actions/create-post";

export default function NewPostForm({ closeModal = () => {}, postId = false }) {
  const { data: session } = useSession();
  const [textarea, setTextarea] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (postId) {
        // Ajout de commentaire si postId est fourni
        await addComment(textarea, postId);
      } else {
        // Création de nouveau post si postId n'est pas fourni
        await createPost(textarea);
      }

      setTextarea("");
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3 w-full">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden mt-5">
          <Image
            src={session?.user.picture}
            alt="User"
            width={80}
            height={80}
            unoptimized
          />
        </div>
        <div className="flex-1">
          <textarea
            name="content"
            placeholder={
              postId ? "Ajouter un commentaire..." : "Commencer un thread..."
            }
            className="input"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Button formButton disabled={textarea.length < 1}>
            {postId ? "Commenter" : "Publier"}
          </Button>
        </div>
      </div>
    </form>
  );
}
