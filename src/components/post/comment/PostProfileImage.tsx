import React from "react";
import Image from "next/image";

const PostProfileImage = ({
  src = "/image.png",
  alt = "author",
  width = 28,
  height = 28,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-full"
    />
  );
};

export default PostProfileImage;
