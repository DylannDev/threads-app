import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Posts({ post }) {
  return (
    <div className="post">
      <div>
        <Image
          src={post.picture}
          alt="User"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">Il y a 1 heure</div>
        </div>
        <div className="mt-3 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
