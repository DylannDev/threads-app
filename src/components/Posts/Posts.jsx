"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";
import {
  PiHeartBold,
  PiChatCircleBold,
  PiPaperPlaneTiltBold,
  PiDotsThreeBold,
  PiHeartFill,
} from "react-icons/pi";
import { TbRepeat } from "react-icons/tb";
import NewPostForm from "../NewPostForm/NewPostForm";
import { createPortal } from "react-dom";

export default function Posts({
  post,
  commentsCount = false,
  countLikes = false,
}) {
  const { data: session } = useSession();
  const postId = post._id;

  const [optionsAreOpen, setOptionsAreOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(
    post.likes ? post.likes.length : 0
  );
  const [liked, setLiked] = useState(
    post.likes ? post.likes.includes(session?.user?.pseudo) : false
  );

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  useEffect(() => {
    fetchCommentsAmount();
  }, []);

  useEffect(() => {
    const likedState = localStorage.getItem(`liked_${postId}`);
    if (likedState !== null) {
      setLiked(JSON.parse(likedState));
    }
  }, []);

  const fetchCommentsAmount = async () => {
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

      setComments(data.comments);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
          action: liked ? "unlike" : "like", // Si l'utilisateur a déjà liké, c'est un unlike, sinon c'est un like
          userId: session?.user?.pseudo,
        }),
      });

      // Vérifier si la requête a réussi
      if (response.ok) {
        // Mettre à jour le state local du nombre de likes et le state du like
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        setLiked(!liked);
        localStorage.setItem(`liked_${postId}`, JSON.stringify(!liked));
      } else {
        throw new Error("Échec de l'action de like/dislike");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'action de like/dislike");
    }
  };

  const onDeletePost = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce thread ?")) return;

    try {
      await deletePost(post._id);
      setOpenModal(false);
    } catch (e) {
      return toast.error(e.message);
    }
    toast.success("Le thread a été supprimé");
  };

  return (
    <div className="post">
      <div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <Image
            src={post.picture}
            alt="User"
            width={50}
            height={50}
            unoptimized
          />
        </div>
      </div>
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/@${post.pseudo}`}>
              <b>{post.pseudo}</b>
            </Link>
            <div className="pt-1 text-[13px] text-threads-gray-light">
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/Paris")
                .fromNow(true)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xl text-white relative">
            {session?.user && (
              <div>
                <PiDotsThreeBold
                  className="cursor-pointer"
                  onClick={() => setOptionsAreOpen(!optionsAreOpen)}
                />
              </div>
            )}
            {optionsAreOpen && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">Signaler</div>
                ) : (
                  <>
                    <div className="option">Modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      Supprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
        {session?.user && (
          <div className="flex gap-2 mt-4 text-2xl w-fit">
            <div onClick={handleLike}>
              {liked ? (
                <PiHeartFill className="cursor-pointer text-red-500" />
              ) : (
                <PiHeartBold className="cursor-pointer" />
              )}
            </div>
            {/* Bouton de like */}

            <PiChatCircleBold
              className="cursor-pointer"
              onClick={() => setOpenModal(true)}
            />
            {session.user.pseudo != post.pseudo && (
              <TbRepeat className="cursor-pointer" />
            )}
            <PiPaperPlaneTiltBold className="cursor-pointer" />
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
                  <div className="modale-foreground">
                    <NewPostForm
                      postId={post._id}
                      closeModal={() => setOpenModal(false)}
                    />
                  </div>
                </div>,
                document.body
              )}
          </div>
        )}
        <div className="flex gap-1">
          <Link href={`/post/${post._id}`}>
            <div className="text-threads-gray-light text-sm mt-4">
              {commentsCount || (comments && comments.length)} réponses ⋅{" "}
              {countLikes ? countLikes : likesCount} mention J'aime
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
