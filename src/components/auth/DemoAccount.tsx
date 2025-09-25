import React from "react";

const DemoAccount = () => {
  return (
    <div className="p-4 text-center border rounded-xl">
      <p className="text-sm text-muted-foreground">Demo account for testing:</p>
      <p className="text-sm text-muted-foreground">
        Email: <span className="font-medium">demo@example.com</span>Password:{" "}
        <span className="font-medium">demo@123</span>
      </p>
    </div>
  );
};

export default DemoAccount;
