import { Conversation } from "@/components/Conversation";
import { HyperText } from "@/components/magicui/hyper-text";
export default function ChatSection() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex-col ">
       <h1 className="text-center text-4xl">Everything is possible with</h1>
        <HyperText className="text-center">Toky</HyperText>
        <Conversation />

        <br /><br />
      </div>
    </main>
  );
}

