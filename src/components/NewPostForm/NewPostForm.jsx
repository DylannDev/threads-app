"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";

export default function NewPostForm() {
  const { data: session } = useSession();
  const [textarea, setTextarea] = useState("");

  const onPrepare = async (formData) => {
    try {
      await createPost(formData);
      setTextarea("");
    } catch (e) {
      return toast.error(e.message);
    }
  };

  return (
    <form action={onPrepare}>
      <div className="flex gap-3 w-full">
        <div>
          <Image
            src={session?.user.picture}
            alt="User"
            width={50}
            height={50}
            className="rounded-full mt-5"
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
