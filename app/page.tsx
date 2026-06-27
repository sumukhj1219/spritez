import React from "react";
import ClaudeMascot from "./collection/claude-mascot/ClaudeMascot";

const page = () => {
  return (
    <div>
      <ClaudeMascot
        actions={{
          onClickSprite: "exercise",
        }}
      />
    </div>
  );
};

export default page;
