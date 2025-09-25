import { UserIcon, UserRound } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";

const ProfileBtn = ({ name }: { name: string }) => {
  return (
    <Button variant={"ghost"}>
      <CardDescription className="flex gap-2 items-center font-bold text-primary/60 ">
        <UserRound />
        {name}
      </CardDescription>
    </Button>
  );
};

export default ProfileBtn;
