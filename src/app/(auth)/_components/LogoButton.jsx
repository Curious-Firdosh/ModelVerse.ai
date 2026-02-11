import { BotIcon } from 'lucide-react'
import React from 'react'

const LogoButton = () => {
    return (
        <div className='flex flex-row justify-center items-center gap-3'>
            <h1 className="
                    text-center font-black tracking-tight leading-tight
                    text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                ">

                <span className="text-zinc-400">
                    Welcome To
                </span>{" "}

                <span className="
                                inline-flex items-center gap-3
                                bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600
                                bg-clip-text text-transparent
                                drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]
                            ">
                    ModelVerse.AI

                    <BotIcon className="
                            w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9
                            text-cyan-400
                            drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]
                            " />
                </span>

            </h1>

        </div>
    )
}

export default LogoButton
