import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Footer from "@/components/Footer/Footer";
import Posts from "@/components/Posts/Posts";
import React from "react";

export default function Index() {
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
      <div className="md:w-[700px] w-full mx-auto mt-10">
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </ConnectedLayout>
  );
}
