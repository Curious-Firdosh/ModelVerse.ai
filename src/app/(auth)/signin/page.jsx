'use client'
import React from 'react'
import LogoButton from '../_components/LogoButton'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/authClient'
import { ChromeIcon, GithubIcon } from 'lucide-react'
import Image from 'next/image'

const page = () => {
    return (
        <section className='flex flex-col items-center justify-center min-h-screen bg-background px-4 py-16 md:py-32'>
            <div>
                <LogoButton />
            </div>

            <p className="
            text-center 
            text-sm sm:text-base md:text-lg 
            font-medium 
            text-zinc-400
            tracking-wide
            ">
                Step into the future of{" "}
                <span className="
                bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500
                bg-clip-text text-transparent 
                font-semibold
                drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]
            ">
                    AI-powered creation
                </span>
                .
            </p>

          
                <Button
                    variant='default'
                    className="w-full py-6 px-10 max-w-sm mt-6 flex items-center justify-center gap-3 cursor-pointer"
                    onClick={() =>
                        signIn.social({
                            provider: "github",
                            callbackURL: "/",
                        })
                    }
                >
                    <GithubIcon className="size-7 text-6xl text-black" />
                    <span>Continue with GitHub</span>
                </Button>


                <Button
                    variant='secondary'
                    className="w-full py-6 px-10 max-w-sm mt-6 flex items-center justify-center gap-3 cursor-pointer"
                    onClick={() =>
                        signIn.social({
                            provider: "google",
                            callbackURL: "/",
                        })
                    }
                >
                    <ChromeIcon className="size-7 text-6xl text-red-500" />
                    <span>Continue with Google</span>
                </Button>
            


        </section>
    )
}

export default page
