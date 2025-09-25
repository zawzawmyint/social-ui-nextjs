import React from "react";

const AuthTitleAndSubtitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="space-y-1">
      <h2 className="text-md font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default AuthTitleAndSubtitle;
