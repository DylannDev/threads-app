"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Profile() {
  const params = useParams();
  const pseudo = params.pseudo.slice(3);

  const posts = [
    {
      id: "1",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      id: "2",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      id: "3",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      id: "4",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
    {
      id: "5",
      content: "Bienvenue sur mon tout nouveau profil Threads !",
      pseudo: "John Doe",
      picture: "/picture.png",
    },
  ];

  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto text-white">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">John Doe</h1>
            <div className="text-threads-gray-light mt-2">@{pseudo}</div>
            <div className="mt-5 whitespace-pre-line">-</div>
            <div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 ">
              <a href="https://dylann-dev.com/" target="_blank">
                dylann-dev.com/
              </a>
            </div>
          </div>
          <div>
            <Image
              src="/picture.png"
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
