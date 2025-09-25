import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Button size={"sm"}>s</Button>{" "}
      <span className="font-bold text-md ml-1 hidden sm:block">Social</span>
    </Link>
  );
};

export default Logo;
