import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bottom-0 w-full z-10 h-16 flex items-center border-t border-white/10 bg-neutral-900">
        <div className="flex w-full h-full justify-center mx-6">
          <div className="flex-auto w-full h-full flex items-center">
            <div className="w-full">
              <div className="relative flex items-center justify-between">
                <div className="text-sm text-white/50">
                  Made by Tom Krusinski
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
