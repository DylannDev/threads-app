"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
// import { createPost } from "@/actions/create-post";
// import { addComment } from "@/actions/add-comment";

export default function NewPostForm({ closeModal = () => {} }) {
  const { data: session } = useSession();
  const [textarea, setTextarea] = useState("");

  // const onCreatePost = async (formData) => {
  //   try {
  //     await createPost(formData);
  //     setTextarea("");
  //   } catch (e) {
  //     return toast.error(e.message);
  //   }

  //   closeModal();
  // };

  // const onAddComment = async (formData) => {
  //   try {
  //     await addComment(formData, postId);
  //     setTextarea("");
  //   } catch (e) {
  //     return toast.error(e.message);
  //   }

  //   closeModal();
  // };

  return (
    <form action="">
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
            placeholder="Commencer un thread..."
            className="input"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <Button formButton disabled={textarea.length < 1}>
            Publier
          </Button>
        </div>
      </div>
    </form>
  );
}
