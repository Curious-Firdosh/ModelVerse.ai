'use client'
import { Button } from "@base-ui/react"
import Image from "next/image"
import LogoButton from "../_components/LogoButton"
import { signIn } from "@/lib/authClient"



const Page = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 px-4">
      
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
        
        {/* Logo */}
        <div className="flex justify-center">
          <LogoButton size="default" />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 text-sm md:text-base">
            Step into the future of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
              AI-powered creation
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          {/* GitHub */}
          <Button
            variant="default"
            className="w-full py-6 rounded-xl bg-white text-black hover:bg-zinc-200 transition font-medium flex items-center justify-center gap-3"
            onClick={() =>
              signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            <Image
              src="/git.svg"
              alt="GitHub"
              width={22}
              height={22}
            />
            Continue with GitHub
          </Button>

          {/* Google */}
          <Button
            variant="secondary"
            className="w-full py-6 rounded-xl bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 transition font-medium flex items-center justify-center gap-3"
            onClick={() =>
              signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={22}
              height={22}
            />
            Continue with Google
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-zinc-500">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>

      </div>
    </section>
  )
}

export default Page
