import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment-timezone";
import "moment/locale/fr";
// import {
//   PiHeartBold,
//   PiChatCircleBold,
//   PiPaperPlaneTiltBold,
// } from "react-icons/pi";
// import { TbRepeat } from "react-icons/tb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function Posts({ post }) {
  // const session = await getServerSession(authOptions);

  return (
    <div className="post">
      <div>
        <Image
          src={post.picture}
          alt="User"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">
            {moment
              .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
              .tz("Europe/Paris")
              .fromNow()}
          </div>
        </div>
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
        {/* {session?.user && (
          <div className="flex gap-2 mt-4 text-lg">
            <PiHeartBold className="cursor-pointer" />
            <PiChatCircleBold className="cursor-pointer" />
            <TbRepeat className="cursor-pointer" />
            <PiPaperPlaneTiltBold className="cursor-pointer" />
          </div>
        )} */}
      </div>
    </div>
  );
}
