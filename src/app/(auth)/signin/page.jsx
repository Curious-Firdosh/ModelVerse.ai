'use client'
import { Button } from "@base-ui/react"
import Image from "next/image"
import LogoButton from "../_components/LogoButton"
import { signIn } from "@/lib/authClient"



const Page = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-background text-foreground px-4 sm:px-6 lg:px-8 transition-colors duration-300">

      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 
                  w-[400px] h-[400px] 
                  sm:w-[500px] sm:h-[500px] 
                  lg:w-[700px] lg:h-[700px] 
                  bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg 
                  space-y-6 sm:space-y-8 
                  rounded-2xl border border-border 
                  bg-card/80 backdrop-blur-xl 
                  shadow-xl p-6 sm:p-8 lg:p-10 
                  transition-all duration-300 hover:shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center">
          <LogoButton size="default" />
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            Welcome Back
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground">
            Step into the future of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
              AI-powered creation
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 sm:space-y-4">

          <Button
            className="w-full h-11 sm:h-12 lg:h-13 
                   rounded-xl flex items-center justify-center gap-3 
                   font-medium text-sm sm:text-base
                   transition-all duration-200 
                   hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            onClick={() =>
              signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            <Image src="/git.svg" alt="GitHub" width={20} height={20} />
            Continue with GitHub
          </Button>

          <Button
            variant="secondary"
            className="w-full h-11 sm:h-12 lg:h-13 
                   rounded-xl flex items-center justify-center gap-3 
                   font-medium text-sm sm:text-base
                   transition-all duration-200 
                   hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            onClick={() =>
              signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </Button>

        </div>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-center text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>

      </div>
    </section>


  )
}

export default Page
