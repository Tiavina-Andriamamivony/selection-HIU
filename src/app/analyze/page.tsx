import ImageRecognizer from "@/components/ImageRecognizer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words= `La première impression est souvent la plus importante, il est donc normal de la soigner. C'est ce qu'offre cette fonctionnalité.`;

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 font-quicksand flex-col justify-center items-center">
      <div className="w-full h-auto text-center pt-6 flex justify-center items-center">
      <TextGenerateEffect words={words}  />
      </div>
          <ImageRecognizer />
    </div>
  )
}
