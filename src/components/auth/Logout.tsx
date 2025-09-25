import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import React from "react";

const Logout = () => {
  return (
    <div>
      <Button>
        <LogOutIcon />
        Logout
      </Button>
    </div>
  );
};

export default Logout;
