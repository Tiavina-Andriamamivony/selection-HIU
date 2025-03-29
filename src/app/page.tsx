"use client"
import { AuroraText } from "@/components/magicui/aurora-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Globe } from "@/components/magicui/globe";
import { WordRotate } from "@/components/magicui/word-rotate";
import { MarqueeDemo } from "@/components/Marquee";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <>
    
    <div className="w-full h-auto box-border flex flex-col items-center justify-center pt-10">
    <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      Bienvenue sur <AuroraText>Skill AI</AuroraText>
    </h1>
    <br />
    <br />
    <h2 className="font-bold text-2xl">Le monde appartient à ceux qui osent. </h2>

    {/* <h2 className="font-bold text-2xl">Osez une nouvelle manière d'apprendre. </h2>
   
    <h2 className="font-bold text-2xl">Osez Skill AI. </h2> */}
    <div className="flex w-auto h-auto gap-2 items-center justify-center flex-col">  
      <h1 className="font-bold text-2xl">Osez</h1>
      <WordRotate
      className="box-border text-2xl font-bold text-white"
      words={["une nouvelle manière d'apprendre.", "Skill AI."]}
    />
       </div>

       <div className="mt-8">
        {isSignedIn ? (
          <Link href="/chat">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Commencer à chatter
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Commencer l'aventure
            </Button>
          </SignInButton>
        )}
      </div>
      <br /><br /><br />

      <MarqueeDemo/>
      <br /><br />
      <span className="text-5xl font-bold text-center pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text"> 
      Rejoignez des milions d'utilisateurs autour du 
      </span>

      

      <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-background px-40 pb-40 pt-8 md:pb-60">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
    </div>
    
    </>
  );
}

