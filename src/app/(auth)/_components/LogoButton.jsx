import { BotIcon } from "lucide-react";
import React from "react";

const LogoButton = ({ size = "default" }) => {
  const isSmall = size === "small";

  return (
    <div className="flex items-center justify-center px-4 w-full">
      <h1
        className={`
          flex items-center gap-2 sm:gap-3
          font-black tracking-tight leading-tight
          text-center
          ${
            isSmall
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-[clamp(1.5rem,5vw,4.5rem)]"
          }
        `}
      >
        {!isSmall && (
          <span className="text-zinc-400 whitespace-nowrap">
            Welcome To
          </span>
        )}

        <span
          className={`
            inline-flex items-center gap-2
            bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600
            bg-clip-text text-transparent
            ${
              isSmall
                ? ""
                : "drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            }
          `}
        >
          ModelVerse.AI

          <BotIcon
            className={`
              ${
                isSmall
                  ? "w-4 h-4"
                  : "w-[clamp(1.2rem,3vw,2.5rem)] h-[clamp(1.2rem,3vw,2.5rem)]"
              }
              text-cyan-400
              drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]
            `}
          />
        </span>
      </h1>
    </div>
  );
};

export default LogoButton;

