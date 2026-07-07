import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  mx-auto min-h-screen gap-y-0">
      <img src="/app/not-found.gif" alt="404" className="w-full h-full" />
      <span className="md:text-xl text-lg text-secondary text-center">
        page not found :)
      </span>
    </div>
  );
};

export default NotFoundPage;
