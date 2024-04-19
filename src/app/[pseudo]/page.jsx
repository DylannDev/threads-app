"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import ProfileModal from "@/components/ProfileModal/ProfileModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Profile() {
  const params = useParams();
  const pseudo = params.pseudo.slice(3);
  const router = useRouter();
  const { data: session } = useSession();

  // States
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!pseudo) {
      router.push("/");
    }

    fetchUserDataPosts();
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

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

    if (!data.user) {
      router.push("/");
      return;
    }

    setUser(data.user);
    setPosts(data.posts);
  };

  const edit = () => {
    setOpenModal(true);
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
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <Image
              src={user.picture}
              alt="User"
              width={100}
              height={100}
              unoptimized
            />
          </div>
        </div>
        {session?.user?.pseudo === pseudo && (
          <button className="user-button" onClick={edit}>
            Modifier le profil
          </button>
        )}
        {openModal &&
          createPortal(
            <div
              className="modale-background"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setOpenModal(false);
                }
              }}
            >
              <ProfileModal
                user={user}
                setUser={setUser}
                openModal={openModal}
                setOpenModal={setOpenModal}
                pseudo={pseudo}
              />
            </div>,
            document.body
          )}
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
