import React from "react";

const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-2xl mx-auto p-6 space-y-4">{children}</div>;
};

export default BaseContainer;
