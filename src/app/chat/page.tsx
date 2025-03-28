import { Conversation } from "@/components/Conversation";
import { HyperText } from "@/components/magicui/hyper-text";
import ImageRecognizer from "@/components/ImageRecognizer";

export default function ChatSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 font-quicksand">
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Everything is possible with
          </h1>
          
          <HyperText className="text-5xl md:text-6xl font-bold">Toky</HyperText>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          <Conversation />
          <ImageRecognizer />
        </div>
      </div>
    </div>
  );
}

