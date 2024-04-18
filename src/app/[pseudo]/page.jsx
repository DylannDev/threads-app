"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const params = useParams();
  const pseudo = params.pseudo.slice(3);

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!pseudo) {
      notFound();
    }

    fetchUserDataPosts();
  }, []);

  const fetchUserDataPosts = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Une erreur est survenue");
    }

    setUser(data.user);
    setPosts(data.posts);
  };

  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto text-white">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">{user.bio}</div>
            <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 ">
              <a href="https://dylann-dev.com/" target="_blank">
                dylann-dev.com/
              </a>
            </div>
          </div>
          <div>
            <Image
              src={user.picture}
              alt="User"
              width={100}
              height={100}
              className="rounded-full object-cover "
            />
          </div>
        </div>
        <div className="flex mt-10">
          <div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer ">
            Threads
          </div>
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer ">
            Réponses
          </div>
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer ">
            Republications
          </div>
        </div>
        <div className="md:w-[700px] w-full mx-auto mt-10">
          {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
        </div>
      </div>
    </ConnectedLayout>
  );
}
