"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ProfileModal({
  user,
  setUser,
  openModal,
  setOpenModal,
  pseudo,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileInput, setProfileInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [linkInput, setLinkInput] = useState("");

  useEffect(() => {
    setProfileInput(user.picture);
    setBioInput(user.bio);
    setLinkInput(user.url);
  }, []);

  const editUser = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: pseudo,
        picture: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    });

    const data = await response.json();
    console.log("data", data);

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Une erreur est survenue !");
      return;
    }

    const newUser = {
      ...user,
      picture: profileInput,
      bio: bioInput,
      url: linkInput,
    };
    setUser(newUser);

    setOpenModal(false);
    setIsLoading(false);

    toast.success("Votre profil a été mis à jour 🎉");
  };

  return (
    <div className="modale-user-foreground">
      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="picture" className="label">
            Photo de profil
          </label>
          <input
            type="url"
            name="picture"
            id="picture"
            className="input"
            placeholder="https://www.unsplash.com/image.png"
            value={profileInput}
            onChange={(e) => setProfileInput(e.target.value)}
          />
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
      <div className="mt-5">
        <label htmlFor="bio" className="label">
          Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          className="input"
          placeholder="Bio..."
          value={bioInput}
          onChange={(e) => setBioInput(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="url" className="label">
          Lien
        </label>
        <input
          type="url"
          name="url"
          id="url"
          className="input"
          placeholder="https://dylann-dev.com"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
        />
      </div>

      <Button onClick={editUser} disabled={isLoading} className="w-full">
        Terminé
      </Button>
    </div>
  );
}
